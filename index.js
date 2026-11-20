/**
 * XEN THEME — Host half.
 *
 * The palette lives in three files of this package (`theme.json`,
 * `syntax-highlighting.json`, `styles.css`) instead of being compiled into the
 * browser bundle. This Host half publishes them on the Web carrier under
 * `/xen-theme/` so the Client half can read the current files on every page
 * load: editing a JSON file and refreshing the page is enough, no rebuild.
 *
 * When the composition has no Web server (for example a `file://` shell), the
 * route is not registered and the Client half falls back to the snapshot
 * embedded in `client.js`, which `scripts/build-client.mjs` regenerates from
 * the same three files.
 *
 * The route serves public, non-secret theme data only. Responses are
 * `cache-control: no-store` so an edited palette is never masked by a cache.
 */

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

/** Package root, resolved from this module's own URL. */
const PACKAGE_ROOT = fileURLToPath(new URL('.', import.meta.url))

/** Prefix shared by every route this plugin owns. */
const ROUTE_PREFIX = '/xen-theme'

/**
 * Served documents: URL path -> [file name, media type].
 * A JSON document is parsed before it is served so a broken edit fails loudly
 * here instead of producing a Client-side parse error with no diagnostic.
 */
const DOCUMENTS = new Map([
  ['/xen-theme/theme.json', ['theme.json', 'application/json; charset=utf-8']],
  ['/xen-theme/syntax-highlighting.json', ['syntax-highlighting.json', 'application/json; charset=utf-8']],
  ['/xen-theme/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/xen-theme/preset.json', ['theme-studio/xen-theme.preset.json', 'application/json; charset=utf-8']],
])

/**
 * Answer one GET/HEAD request from the theme package.
 * @param request - Fetch request the Web carrier supplies.
 * @returns the document response, or a JSON error with the reason.
 */
async function serveDocument(request) {
  const url = new URL(request.url, 'http://xen-theme.invalid')
  const entry = DOCUMENTS.get(url.pathname)

  if (entry === undefined) {
    // A small directory document keeps manual debugging simple.
    if (url.pathname === ROUTE_PREFIX || url.pathname === `${ROUTE_PREFIX}/`) {
      return jsonResponse({
        name: 'xen-theme',
        documents: [...DOCUMENTS.keys()],
      })
    }
    return jsonResponse({ error: 'not-found', path: url.pathname }, 404)
  }

  const [file, contentType] = entry
  try {
    const text = await readFile(`${PACKAGE_ROOT}${file}`, 'utf8')
    // Validate JSON here: the Client treats a parse failure as "use fallback",
    // and a 500 with the reason is far easier to diagnose than a silent one.
    if (contentType.startsWith('application/json')) JSON.parse(text)
    return new Response(text, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
      },
    })
  } catch (error) {
    return jsonResponse({
      error: 'unreadable-document',
      file,
      message: error instanceof Error ? error.message : String(error),
    }, 500)
  }
}

/**
 * Build a JSON response.
 * @param value - serializable body.
 * @param status - HTTP status, 200 by default.
 * @returns the response.
 */
function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}

/**
 * Mount the palette documents on the Web carrier when one exists.
 * @param ctx - Host plugin context.
 */
export function apply(ctx) {
  ctx.inject(['webServer'], (scope) => {
    scope.effect(
      () => scope.webServer.register({
        kind: 'prefix',
        path: ROUTE_PREFIX,
        resource: serveDocument,
      }),
      'xen-theme: palette documents route',
    )
  })
}
