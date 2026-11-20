#!/usr/bin/env node
/**
 * XEN THEME — palette build.
 *
 * Reads the three editable palette files and:
 *  1. validates their shape (every light token has a dark counterpart, ANSI
 *     arrays are 16 entries, colors look like colors);
 *  2. refreshes the EMBEDDED fallback inside `client.js`, so the theme still
 *     works in a shell without a Web server;
 *  3. writes `theme-studio/xen-theme.preset.json`, the backup document a user
 *     imports into dsh-theme-studio.
 *
 * Usage (no dependencies):
 *   node scripts/build-client.mjs
 *   node scripts/build-client.mjs --check   # validate only, write nothing
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const CHECK_ONLY = process.argv.includes('--check')

const CLIENT_PATH = join(ROOT, 'client.js')
const THEME_PATH = join(ROOT, 'theme.json')
const SYNTAX_PATH = join(ROOT, 'syntax-highlighting.json')
const CSS_PATH = join(ROOT, 'styles.css')
const PRESET_PATH = join(ROOT, 'theme-studio', 'xen-theme.preset.json')

const START = '/* @xen-embedded-start */'
const END = '/* @xen-embedded-end */'

/** Read and parse a JSON file with a readable error. */
async function readJson(path) {
  const text = await readFile(path, 'utf8')
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new Error(`${path}: invalid JSON — ${error.message}`)
  }
}

/** Collect validation warnings instead of failing the build on style issues. */
const warnings = []

/** A CSS color value: hex, rgb()/hsl() function, var() or a keyword such as transparent. */
function looksLikeColor(value) {
  if (typeof value !== 'string' || value.trim() === '') return false
  const text = value.trim()
  if (/^#[0-9a-f]{3,8}$/i.test(text)) return true
  if (/^(?:rgb|hsl|oklch|oklab|lab|lch|color|color-mix|var|light-dark)\(/i.test(text)) return true
  if (/^[a-z]+$/i.test(text)) return true
  return false
}

/** One `{ light, dark }` pair per token, mirroring a one-sided token. */
function tokenPairs(theme, highContrast = false) {
  const tokens = theme.tokens ?? {}
  const light = { ...(tokens.light ?? {}) }
  const dark = { ...(tokens.dark ?? {}) }
  if (highContrast) {
    Object.assign(light, theme.highContrast?.light ?? {})
    Object.assign(dark, theme.highContrast?.dark ?? {})
  }
  const names = new Set([...Object.keys(light), ...Object.keys(dark)])
  const pairs = {}
  for (const name of names) {
    if (!name.startsWith('--')) continue
    const lightValue = String(light[name] ?? dark[name] ?? '').trim()
    const darkValue = String(dark[name] ?? lightValue).trim()
    if (lightValue === '' && darkValue === '') continue
    pairs[name] = { light: lightValue, dark: darkValue }
  }
  return pairs
}

/** ANSI/Shiki stylesheet, mirroring the Client's buildSyntaxCss. */
function syntaxCss(syntax, highContrast = false) {
  const light = { ...(syntax.tokens?.light ?? {}), ...(highContrast ? syntax.highContrast?.light ?? {} : {}) }
  const dark = { ...(syntax.tokens?.dark ?? {}), ...(highContrast ? syntax.highContrast?.dark ?? {} : {}) }
  const darkAnsi = Array.isArray(syntax.ansi?.dark) ? syntax.ansi.dark : []
  const lightAnsi = Array.isArray(syntax.ansi?.light) ? syntax.ansi.light : darkAnsi

  const declarations = (map, palette) => {
    const lines = []
    for (const [name, value] of Object.entries(map)) {
      if (!name.startsWith('--')) continue
      const text = String(value).replace(/[\n\r;{}]/gu, '').trim()
      if (text !== '') lines.push(`  ${name}: ${text};`)
    }
    palette.forEach((color, index) => {
      const text = String(color).replace(/[\n\r;{}]/gu, '').trim()
      if (text !== '') lines.push(`  --xen-ansi-${index}: ${text};`)
    })
    return lines.join('\n')
  }

  return [
    '/* XEN THEME — ANSI palette and Shiki code-token colors */',
    ':root:root {',
    declarations(light, lightAnsi),
    '}',
    'body[data-ds-dark-theme][data-ds-dark-theme] {',
    declarations(dark, darkAnsi),
    '}',
    '',
  ].join('\n')
}

/** Validate the three documents. */
function validate(theme, syntax) {
  if (theme.tokens?.light === undefined || theme.tokens?.dark === undefined) {
    throw new Error('theme.json: tokens.light and tokens.dark are both required')
  }
  const lightNames = Object.keys(theme.tokens.light)
  const darkNames = Object.keys(theme.tokens.dark)
  for (const name of lightNames) {
    if (theme.tokens.dark[name] === undefined) warnings.push(`theme.json: "${name}" has no dark value; it will reuse the light value`)
  }
  for (const name of darkNames) {
    if (theme.tokens.light[name] === undefined) warnings.push(`theme.json: "${name}" has no light value; it will reuse the dark value`)
  }
  for (const [scheme, map] of Object.entries(theme.tokens)) {
    for (const [name, value] of Object.entries(map)) {
      if (!looksLikeColor(value)) warnings.push(`theme.json: ${scheme} "${name}" is not a recognized color: ${JSON.stringify(value)}`)
    }
  }
  for (const scheme of ['dark', 'light']) {
    const palette = syntax.ansi?.[scheme]
    if (!Array.isArray(palette) || palette.length !== 16) {
      throw new Error(`syntax-highlighting.json: ansi.${scheme} must contain exactly 16 colors`)
    }
    for (const [index, color] of palette.entries()) {
      if (!looksLikeColor(color)) warnings.push(`syntax-highlighting.json: ansi.${scheme}[${index}] is not a recognized color`)
    }
    if (syntax.tokens?.[scheme] === undefined) throw new Error(`syntax-highlighting.json: tokens.${scheme} is required`)
  }
  for (const [key, value] of Object.entries(theme.typography ?? {})) {
    if (key.endsWith('Px') && !Number.isInteger(value)) warnings.push(`theme.json: typography.${key} should be an integer`)
  }
}

/** Replace the generated block of client.js, keeping its markers. */
function embed(client, payload) {
  const start = client.indexOf(START)
  const end = client.indexOf(END)
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`client.js: the ${START} … ${END} markers are missing`)
  }
  if (client.indexOf(START, start + 1) !== -1) throw new Error('client.js: duplicate embedded markers')
  const before = client.slice(0, start + START.length)
  const after = client.slice(end)
  const json = JSON.stringify(payload, null, 2)
  return `${before}\n    const EMBEDDED = ${json}\n    ${after}`
}

/** Theme Studio backup document: all overrides plus the typography and syntax sheets. */
function studioPreset(theme, syntax, css) {
  const overrides = tokenPairs(theme)
  const base = theme.typography?.baseSizePx ?? 16
  const code = theme.typography?.codeSizePx ?? 15
  overrides['--dsh-content-font-size'] = { light: `${base}px`, dark: `${base}px` }
  overrides['--dsh-code-font-size'] = { light: `${code}px`, dark: `${code}px` }
  return {
    v: 1,
    enabled: true,
    overrides,
    advancedCss: `${css}\n\n${syntaxCss(syntax)}`,
    rev: Date.now(),
  }
}

/** Read the snapshot currently embedded in client.js. */
function embeddedPayload(client) {
  const start = client.indexOf(START)
  const end = client.indexOf(END)
  const marker = 'const EMBEDDED = '
  const valueStart = client.indexOf(marker, start)
  if (start === -1 || end === -1 || valueStart === -1 || end < valueStart) {
    throw new Error('client.js: cannot locate the embedded snapshot')
  }
  return JSON.parse(client.slice(valueStart + marker.length, end).trim())
}

/** Compare the checked-in snapshot and preset with the source documents. */
async function checkDrift(client, theme, syntax, css) {
  const expected = { theme, syntax, css }
  const actual = embeddedPayload(client)
  const problems = []
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    problems.push('client.js: embedded snapshot is stale')
  }
  let preset
  try {
    preset = JSON.parse(await readFile(PRESET_PATH, 'utf8'))
  } catch (error) {
    problems.push(`${PRESET_PATH}: ${error.message}`)
    return problems
  }
  const wanted = studioPreset(theme, syntax, css)
  if (JSON.stringify(preset.overrides) !== JSON.stringify(wanted.overrides)) {
    problems.push(`${PRESET_PATH}: overrides are stale`)
  }
  if (preset.advancedCss !== wanted.advancedCss) {
    problems.push(`${PRESET_PATH}: advancedCss is stale`)
  }
  if (preset.enabled !== true) problems.push(`${PRESET_PATH}: enabled should be true`)
  return problems
}

async function main() {
  const [theme, syntax, css, client] = await Promise.all([
    readJson(THEME_PATH),
    readJson(SYNTAX_PATH),
    readFile(CSS_PATH, 'utf8'),
    readFile(CLIENT_PATH, 'utf8'),
  ])

  validate(theme, syntax)

  if (CHECK_ONLY) {
    for (const warning of warnings) console.warn(`warning: ${warning}`)
    const drift = await checkDrift(client, theme, syntax, css)
    for (const problem of drift) console.error(`drift: ${problem}`)
    console.log(`xen-theme: palette valid (${Object.keys(theme.tokens.light).length} light tokens, ${Object.keys(theme.tokens.dark).length} dark tokens)`)
    if (drift.length > 0) {
      console.error('xen-theme: run "node scripts/build-client.mjs" to refresh the embedded snapshot and preset')
      process.exitCode = 1
    }
    return
  }

  const embedded = embed(client, { theme, syntax, css })
  await writeFile(CLIENT_PATH, embedded, 'utf8')

  const preset = studioPreset(theme, syntax, css)
  await writeFile(PRESET_PATH, `${JSON.stringify(preset, null, 2)}\n`, 'utf8')

  for (const warning of warnings) console.warn(`warning: ${warning}`)
  console.log(`xen-theme: embedded ${Object.keys(tokenPairs(theme)).length} token pairs in client.js`)
  console.log(`xen-theme: wrote ${PRESET_PATH}`)
  console.log(`xen-theme: client.js is ${(Buffer.byteLength(embedded, 'utf8') / 1024).toFixed(1)} KiB`)
}

main().catch((error) => {
  console.error(`xen-theme: ${error.message}`)
  process.exitCode = 1
})
