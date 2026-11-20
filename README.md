# XEN THEME

Tema personalizado para **DeepSeek Harness** basado en la paleta ANSI XEN: un fondo casi negro (`#101113`), texto azul grisáceo pastel (`#D0E0F0`) y acentos lavanda, azul periwinkle, magenta y rosa empolvado. Incluye una variante clara rosada derivada, paleta ANSI completa para el resaltado de bloques de código, tipografía JetBrains Mono, modo de alto contraste opcional y un comando `/xen` para volver al tema por defecto en un segundo.

- **Nombre del paquete:** `xen-theme`
- **Versión:** `1.0.0`
- **Licencia:** MIT
- **Requisito de DSH:** `>=0.2.2-rc.3 <0.3.0` (ver [Compatibilidad](#compatibilidad-y-estado-de-verificación))
- **Dependencias:** ninguna. No ejecuta scripts de instalación ni hace peticiones de red fuera del propio Host.

---

## Cómo se ve

**Modo oscuro (el principal).** XEN no cambia la preferencia de Apariencia: si el sistema está en claro verás la variante clara. Elige **Oscuro** en Apariencia para usar la paleta principal. El lienzo es un negro azulado profundo; el texto principal es un azul grisáceo pastel, el secundario un gris verdoso y el terciario un gris claro. Los paneles y las tarjetas elevadas usan un ciruela grisáceo (`#4a4253`) con bordes muy finos y sutiles. Los enlaces y los botones principales son azul periwinkle; los estados usan rojo salmón, rosa cálido y verde menta. Los bloques de código aparecen sobre casi negro con palabras clave lavanda, funciones magenta claro, cadenas gris cian, números rosados y comentarios gris claro.

**Modo claro.** Se deriva de los mismos tonos: lienzo rosa muy pálido (`#FFF0F5`), texto tinta (`#101113`), superficies en rosa crema y acentos azul periwinkle atenuados para conservar el contraste. La selección de texto es rosa (`#E8A79B`) con texto tinta.

**Alto contraste.** Sustituye los tonos medios por los extremos de la paleta: texto casi blanco (`#FFF0F5`), acentos azules brillantes (`#B4CBEA`) y bordes más opacos. En modo claro, endurece los estados y los bordes en lugar de aclararlos.

No se incluye una captura de pantalla dentro del repositorio a propósito: los colores dependen de la pantalla, del esquema activo y de la fuente instalada. La forma fiable de verlo es instalar el plugin y abrir la interfaz; los valores exactos están en las tablas de abajo.

---

## Características

- Mapea **118 tokens de interfaz** por esquema, todos los `--dsw-alias-*` y `--dsw-specific-*` que publica esta versión de DSH, no solo los 22 esenciales, para que los paneles, menús, diffs, scrollbars y tarjetas no conserven el azul de DeepSeek.
- Aplica la **paleta ANSI completa** a los bloques de código a través de las variables `--shiki-*` que usa el cliente web, y expone los 16 colores como `--xen-ansi-0` … `--xen-ansi-15` para CSS propio.
- **Modo claro y oscuro** desde un único mapeo; sigue la preferencia de Apariencia (`claro`, `oscuro` o `sistema`).
- **Alto contraste** por token, sin duplicar el tema.
- **Fuentes**: `system-ui, -apple-system, "Segoe UI", sans-serif` para la interfaz y `"JetBrains Mono", "Fira Code", "Cascadia Code", monospace` para el código; interlineado 1.6. Los tamaños son nativos de DSH: 16 px de lectura y 15 px de código son los valores recomendados que aplica el botón de la fila, y luego se cambian en **Ajustes → Apariencia**.
- **Comando `/xen`** para activar o desactivar XEN THEME y `/xen-contrast` para el alto contraste.
- **Fila propia en Ajustes → General** con los dos interruptores y un botón para copiar el preset compatible con dsh-theme-studio.
- **Paleta editable en archivos**: `theme.json`, `syntax-highlighting.json` y `styles.css`. El Host sirve la versión actual; basta recargar la página.
- Sin dependencias, sin build obligatorio y sin tocar la configuración del perfil a mano.

---

## Instalación

### Desde GitHub

El repositorio de este paquete es **`xenwithcode/xen-theme`**. El `package.json` debe quedar en la **raíz** del repositorio. Si lo publicas bajo otra cuenta u otro nombre, cambia `xenwithcode/xen-theme` en `package.json`, en este README y en `cordis.patch.yml`.

¿Primera vez con GitHub? Sigue la guía paso a paso: [GITHUB.md](GITHUB.md).

```sh
dsh plugin --profile desktop add github:xenwithcode/xen-theme
```

Si tu versión de pnpm no reconoce el atajo `github:`, usa la URL completa (y fija un commit para una instalación reproducible):

```sh
dsh plugin --profile desktop add git+https://github.com/xenwithcode/xen-theme.git
dsh plugin --profile desktop add "git+https://github.com/xenwithcode/xen-theme.git#<commit>"
```

`dsh plugin add` reenvía el argumento a pnpm y, al terminar, reconcilia los bundles del perfil: un paquete que declara `dsh.bundle` se añade a la lista de bundles activos. El `--profile desktop` es el perfil de DeepSeek Harness Desktop; si lanzas otro perfil, usa su nombre o el valor de `DSH_PROFILE`. Sin `--profile`, el comando actúa sobre el perfil por defecto de la CLI, así que `dsh plugin add github:xenwithcode/xen-theme` y `dsh plugin remove xen-theme` funcionan igual cuando ese perfil ya está seleccionado.

### Sin terminal (DeepSeek Harness Desktop)

Si no tienes el comando `dsh` en el `PATH`, instala desde la interfaz:

1. En GitHub, pulsa **Code → Download ZIP** y descomprime el archivo.
2. Abre DeepSeek Harness y ve a **Plugins → Add plugin**.
3. Selecciona la carpeta descomprimida `xen-theme` (la que contiene `package.json`, no la carpeta padre).
4. Recarga la página. El bundle queda seleccionado y el tema activo.

La misma ruta sirve para una carpeta local tuya. Es la forma recomendada en Desktop si no usas la CLI.

### Desde una carpeta local

```sh
cd /ruta/a/xen-theme
dsh plugin --profile desktop add "$(pwd)"
```

Instalar desde una carpeta local enlaza el directorio: los cambios en `theme.json`, `syntax-highlighting.json` o `styles.css` se leen en la siguiente carga de página sin reinstalar.

### Comprobar la activación

1. Abre **Plugins** en la barra lateral y confirma que **XEN THEME** aparece seleccionado.
2. Recarga la página del navegador. Un bundle nuevo puede activarse por HMR, pero una recarga garantiza que el módulo de cliente y la hoja de estilos se carguen juntos.
3. Abre **Ajustes → General**: debe aparecer la fila **XEN THEME**, entre las preferencias de transcripción y las de desarrollo.

### Desinstalar

```sh
dsh plugin --profile desktop remove xen-theme
```

Al quitar la dependencia, el reconciliador retira el bundle de la lista de seleccionados. Si el tema estaba activo, se retiran su capa de tokens y su hoja de estilos. XEN no modifica por sí solo los tamaños de Apariencia: los que hayas aplicado con el botón **Tamaños 16/15** de la fila se conservan. Recarga la página para confirmar que la interfaz vuelve al tema por defecto.

---

## Uso

### Alternar el tema

- Escribe `/xen` en el compositor y elige el comando en el menú. La primera invocación desactiva XEN THEME y deja el tema por defecto de DSH; la siguiente lo vuelve a activar.
- También puedes usar la casilla **Aplicar XEN THEME** de **Ajustes → General → XEN THEME**.
- El estado se guarda por navegador (`localStorage`, clave `xen-theme.v1`), igual que las preferencias de vista de otros plugins. No se escribe en el perfil ni en el historial de la sesión.

### Alto contraste

- Escribe `/xen-contrast`, o marca **Alto contraste** en la fila de ajustes.
- El modo solo está disponible mientras XEN THEME está activo; si lo desactivas, el valor se conserva para la próxima activación.
- El alto contraste se aplica tanto al esquema oscuro como al claro, con los colores más brillantes de la paleta y bordes reforzados.

### Qué ocurre al desactivar

- Se retira la capa de tokens del servicio de temas y se vacían las hojas de estilos de XEN. La preferencia de tamaño de Apariencia no se toca al desactivar; el botón de la fila es la única acción de XEN que la escribe.
- Los comandos `/xen` y `/xen-contrast` desaparecen del menú mientras el plugin está desinstalado, pero vuelven al reinstalarlo.
- No se modifica ningún dato de sesión, credencial ni archivo del proyecto.
- Mientras está activo, el tema publica `--xen-theme-state` (`on` o `high-contrast`) en el elemento `body` y escribe `document.documentElement.dataset.xenTheme` (`on`, `high-contrast` u `off`). Sirven para inspeccionar el estado con las herramientas del navegador; el atributo se elimina al desinstalar, no al desactivar.

---

## Personalización

La paleta está separada por responsabilidad. Los tres archivos se sirven desde el Host bajo `/xen-theme/` y se leen en cada carga de página, así que **no hay que recompilar** para ver un cambio: edita, guarda y recarga.

| Archivo | Qué controla |
|---|---|
| `theme.json` | Colores de interfaz (`tokens.dark` y `tokens.light`), alto contraste y tamaños de lectura/código. |
| `syntax-highlighting.json` | Paleta ANSI de 16 colores y variables `--shiki-*` del resaltado de código. |
| `styles.css` | Familias tipográficas, interlineado, selección de texto y detalles de código. |

### Cambiar un color de interfaz

Edita el valor en `theme.json`. Cada token debe existir en `tokens.dark` y `tokens.light` (si falta uno, el build lo avisa y el cliente reutiliza el del otro esquema):

```json
{
  "tokens": {
    "dark": {
      "--dsw-alias-brand-primary": "#B4CBEA"
    },
    "light": {
      "--dsw-alias-brand-primary": "#6F87B5"
    }
  }
}
```

Para que un token cambie solo en alto contraste, añádelo a `highContrast.dark` o `highContrast.light`; no hace falta repetirlo en el mapeo normal.

### Cambiar el resaltado de código

`syntax-highlighting.json` tiene tres bloques:

- `ansi.dark` / `ansi.light`: exactamente 16 colores por esquema. Se publican como `--xen-ansi-0` … `--xen-ansi-15`.
- `tokens.dark` / `tokens.light`: valores de `--shiki-foreground`, `--shiki-background` y `--shiki-token-*`.
- `highContrast.dark` / `highContrast.light`: sustituciones parciales para el modo de alto contraste.

Los nombres de `--shiki-token-*` son los que emite el tema `css-variables` de Shiki que usa DSH: `comment`, `constant`, `string`, `string-expression`, `keyword`, `parameter`, `function`, `punctuation` y `link`. El campo `mapping` del archivo documenta qué slot ANSI alimenta cada token.

### Cambiar fuentes e interlineado

Todo está en `styles.css`:

```css
:root {
  --xen-font-ui: system-ui, -apple-system, "Segoe UI", sans-serif;
  --xen-font-code: "JetBrains Mono", "Fira Code", "Cascadia Code", monospace;
  --xen-line-height: 1.6;
}
```

Las familias se aplican a `--dsw-font-family` (interfaz y lectura) y `--ds-font-family-code` (código, diffs y código en línea). Para usar otra fuente, cambia la primera familia del stack; las siguientes son el respaldo cuando la máquina no tiene esa fuente instalada.

### Agrandar la barra lateral

La barra lateral no sigue **Ajustes → Apariencia**: sus títulos usan 14 px fijos en los componentes de DSH. XEN la sube a 15 px con una regla propia en `styles.css`:

```css
:root {
  --xen-sidebar-font-size: 15px;
  --xen-sidebar-line-height: 21px;
}
```

Sube `--xen-sidebar-font-size` a `16px` para un paso más claro. Afecta a la lista de paneles, a las sesiones y a la fila de ajustes de la barra lateral; el resto de la interfaz no cambia.

### Cambiar tamaños y alto contraste

- **El tamaño lo controla DSH, no XEN.** Usa **Ajustes → Apariencia** para el texto de conversación, el código y el terminal. XEN no sobrescribe esos valores, así que el cambio se ve al instante.
- `theme.json` → `typography.baseSizePx` (10–22) y `typography.codeSizePx` (10–16) son los **valores recomendados** que aplica el botón **Tamaños 16/15** de la fila XEN. Ese botón escribe la preferencia en Apariencia (acción explícita) y después puedes seguir ajustándola allí.

### Validar y regenerar el respaldo

El plugin incluye un respaldo embebido en `client.js` para composiciones sin servidor web (por ejemplo, una ventana `file://`). Se regenera desde los tres archivos:

```sh
node scripts/build-client.mjs --check   # valida sin escribir nada
node scripts/build-client.mjs           # actualiza el respaldo y el preset de Theme Studio
```

El script no tiene dependencias. Si editas el tema en una instalación normal servida por HTTP, no necesitas ejecutarlo; solo es necesario para el respaldo y para refrescar `theme-studio/xen-theme.preset.json`. `--check` también detecta si el respaldo o el preset se han quedado atrás respecto a los tres archivos.

Si el Host responde pero un archivo no se puede leer (JSON roto, error 500), el tema sigue activo con el último respaldo embebido y la fila muestra «Activo con paleta de respaldo · revisa …» en color de error. En una página sin servidor web el respaldo es el modo normal y no se muestra error.

---

## Integración con dsh-theme-studio

`dsh-theme-studio` guarda sus overrides en su propio documento y los aplica con `ctx.theme.overrideTokens`, igual que XEN THEME. La integración disponible es un **preset importable**:

1. Abre **Ajustes → Theme Studio**.
2. Ve a la pestaña **Presets**. Al final de la página está la sección **Backup**, con un área de texto y el botón **Apply pasted config**.
3. Pega el contenido de `theme-studio/xen-theme.preset.json`, o usa el botón **Copiar preset de Theme Studio** de la fila XEN THEME.
4. Pulsa **Apply pasted config**.

El preset incluye los 118 pares de tokens, los tamaños y el CSS de tipografía y sintaxis, de modo que reproduce XEN THEME dentro de Theme Studio. Si el alto contraste está activo, el botón copia la variante de alto contraste y lo indica en su etiqueta.

**Limitación real:** Theme Studio 0.1.0 define sus presets como constantes compiladas en su bundle; no expone un registro para que otro paquete añada tarjetas a la pestaña **Presets**. Por eso XEN THEME no puede “aparecer” allí automáticamente y se entrega como documento de importación. Si una versión futura de Theme Studio publica un registro de presets, este archivo ya tiene la forma de backup de su pestaña Presets.

**No actives XEN THEME y el preset de Theme Studio a la vez sobre los mismos tokens**: ambos apilan capas y la última registrada gana por token. Después de importar, desactiva XEN THEME con `/xen` o apaga el interruptor **Apply my theme** de Theme Studio. Ten en cuenta que `/xen` solo retira la capa de XEN, no la de Theme Studio.

---

## Paleta

### ANSI completa

| # | Oscuro | Claro |
|---|---|---|
| 0 (black) | `#101113` | `#101113` |
| 1 (red) | `#D48F83` | `#A34A3E` |
| 2 (green) | `#8FA6B4` | `#4C6B7D` |
| 3 (yellow) | `#D1B2B0` | `#7A5A54` |
| 4 (blue) | `#8FA8CD` | `#4F6B99` |
| 5 (magenta) | `#A699C1` | `#62548A` |
| 6 (cyan) | `#9FA6A1` | `#4F5A53` |
| 7 (white) | `#A5AAB2` | `#5A5A64` |
| 8 (bright black) | `#4a4253` | `#4A4452` |
| 9 (bright red) | `#E8A79B` | `#C2675A` |
| 10 (bright green) | `#BCE7C6` | `#5F7E93` |
| 11 (bright yellow) | `#FFF0F5` | `#A88684` |
| 12 (bright blue) | `#B4CBEA` | `#3F5C86` |
| 13 (bright magenta) | `#C3B6DE` | `#4B3F73` |
| 14 (bright cyan) | `#BAC3BF` | `#3F4A43` |
| 15 (bright white) | `#D0E0F0` | `#101113` |

> Los nombres “green”, “yellow”, etc. son los slots ANSI de la especificación; no describen el matiz literal de estos pasteles. El modo claro oscurece cada tono para conservar legibilidad sobre `#FFF0F5`; no es una simple inversión.

### Tokens de interfaz requeridos

| Token | Oscuro | Claro |
|---|---|---|
| `--dsw-alias-bg-base` | `#101113` | `#FFF0F5` |
| `--dsw-alias-bg-layer-1` | `#101113` | `#FFF8FB` |
| `--dsw-alias-bg-layer-2` | `#4a4253` | `#FBEEF3` |
| `--dsw-alias-bg-layer-3` | `#4a4253` | `#F4E7ED` |
| `--dsw-alias-bg-overlay` | `#101113` | `#FFF8FB` |
| `--dsw-alias-label-primary` | `#D0E0F0` | `#101113` |
| `--dsw-alias-label-secondary` | `#BAC3BF` | `#4A4452` |
| `--dsw-alias-label-tertiary` | `#A5AAB2` | `#6E6875` |
| `--dsw-alias-brand-primary` | `#8FA8CD` | `#6F87B5` |
| `--dsw-alias-brand-text` | `#101113` | `#101113` |
| `--dsw-alias-link` | `#8FA8CD` | `#4F6B99` |
| `--dsw-alias-state-error-primary` | `#D48F83` | `#A34A3E` |
| `--dsw-alias-state-warn-primary` | `#E8A79B` | `#9E5546` |
| `--dsw-alias-state-success-primary` | `#BCE7C6` | `#2F6B45` |
| `--dsw-alias-state-business-primary` | `#8FA8CD` | `#4F6B99` |
| `--dsw-alias-interactive-bg-hover` | `#4a425340` | `#4a425314` |
| `--dsw-alias-interactive-bg-active` | `#4a425360` | `#4a425324` |
| `--dsw-alias-border-l1` | `#4a425340` | `#4a425326` |
| `--dsw-alias-border-l2` | `#4a425360` | `#4a425340` |
| `--dsw-alias-border-l3` | `#4a425380` | `#4a425359` |
| `--dsw-alias-markdown-code-block` | `#101113` | `#FBEEF3` |
| `--dsw-alias-switch-thumb` | `#D0E0F0` | `#101113` |

### Tokens complementarios

`theme.json` mapea 118 tokens por esquema, es decir, todos los tokens de alias y de componente que publica esta versión de DSH. Además de los 22 de arriba, cubre botones, tarjetas de ajustes, menús, tooltips, toasts, scrollbars, campos de entrada, diffs de archivos, onboarding, selección de documento, skeleton y las superficies `--dsw-specific-*` (burbuja, compositor, barra lateral, menú, selector). La lista canónica y cada valor están en `theme.json`; los grupos principales son:

- **Botones:** `--dsw-alias-button-primary-fill`, `-hover`, `-dimmed`, `-info-fill`, `-info-hover`, `-contrast-fill`, `-elevated-fill`, `-floating-fill`, `-floating-hover`, `-ghost-active-fill`, `-ghost-active-hover`, `-ghost-active-border`, `-tool-bar-fill`, `-tool-bar-fill-invisible`, `-tool-bar-hover`.
- **Estados:** `--dsw-alias-state-error-secondary`, `-warn-secondary`, `-warn-label`, `-warn-tertiary`, `-success-secondary`, `-success-tertiary`, `-business-tertiary`, `--dsw-alias-state-idle-primary`.
- **Código y markdown:** `--dsw-alias-markdown-code-block-banner`, `-inline-code`, `-tag`, `-citation`, `-placeholder`, `-code-segment-selected`, `-code-segment-unselected`, `--dsw-alias-code-diff-added`, `-deleted`, y las ocho superficies `--dsw-alias-file-diff-*`.
- **Superficies:** `--dsw-alias-settings-card-fill`/`-stroke`, `--dsw-alias-menu-icon`, `--dsw-alias-menu-group-header-fill`, `--dsw-alias-tooltip-bg`, `--dsw-alias-tooltip-key-bg`, `--dsw-alias-toast-bg`, `--dsw-alias-toast-label`, `--dsw-alias-turn-trigger-bg`/`-hover`, y las máscaras `--dsw-alias-bg-mask-1`/`-2`/`-3`/`-drop`/`-photo`.
- **Animaciones y piezas especiales:** `--dsw-alias-label-shimmer`, `--dsw-alias-label-deep-diving`, `-deep-diving-shimmer`, `--dsw-alias-label-document-preview`, `--dsw-alias-brand-primary-new-colorprimary-new-color`.
- **Scrollbars y fondos:** `--dsw-alias-scrollbar-bg-l1`/`-l2`, `--dsw-alias-scrollbar-hover-l1`/`-l2`, `--dsw-alias-bg-skeleton`, `-multi-select`, `-document-selection`, `-document-preview`, `-module-platform`.
- **Onboarding:** `--dsw-alias-onboarding-accent`, `-card-fill`, `-checkbox-border`, `-secondary-fill`.

### Tipografía

| Ajuste | Valor |
|---|---|
| Fuente de interfaz | `system-ui, -apple-system, "Segoe UI", sans-serif` |
| Fuente de código | `"JetBrains Mono", "Fira Code", "Cascadia Code", monospace` |
| Tamaño base de lectura | Recomendado `16px`; el efectivo lo fija **Ajustes → Apariencia** |
| Tamaño de código en bloques | Recomendado `15px`; el efectivo lo fija **Ajustes → Apariencia** |
| Interlineado | `1.6` (`--xen-line-height` en `styles.css`) |

XEN no impone tamaños: **Ajustes → Apariencia** sigue siendo la única fuente de verdad. El botón **Tamaños 16/15** de la fila escribe los valores recomendados (`typography.baseSizePx` y `codeSizePx`) en esa preferencia, de modo que el cambio se refleja de inmediato en Apariencia y puedes seguir ajustándolo allí. La interfaz de DSH (filas, menús, botones) usa tamaños fijos de 13/14 px y no escala con esa preferencia; para agrandar toda la interfaz usa el zoom del navegador (`Cmd`/`Ctrl` + `+`).

Las familias del stack deben estar instaladas en la máquina; si no, el navegador usa la siguiente de la lista. Mientras XEN está activo, su stack sustituye visualmente la familia elegida en Apariencia; la preferencia guardada no se modifica y vuelve a verse al desactivar.

### Resaltado de sintaxis

| Variable | Oscuro | Claro | Alto contraste oscuro |
|---|---|---|---|
| `--shiki-foreground` | `#D0E0F0` | `#101113` | `#FFF0F5` |
| `--shiki-background` | `#101113` | `#FBEEF3` | `#101113` |
| `--shiki-token-comment` | `#A5AAB2` | `#6E6875` | `#BAC3BF` |
| `--shiki-token-constant` | `#D1B2B0` | `#7A5A54` | `#FFF0F5` |
| `--shiki-token-string` | `#9FA6A1` | `#4F5A53` | `#BAC3BF` |
| `--shiki-token-string-expression` | `#BAC3BF` | `#3F4A43` | `#BCE7C6` |
| `--shiki-token-keyword` | `#A699C1` | `#62548A` | `#C3B6DE` |
| `--shiki-token-parameter` | `#8FA6B4` | `#4C6B7D` | `#BCE7C6` |
| `--shiki-token-function` | `#C3B6DE` | `#4B3F73` | `#C3B6DE` |
| `--shiki-token-punctuation` | `#A5AAB2` | `#5A5A64` | `#D0E0F0` |
| `--shiki-token-link` | `#8FA8CD` | `#4F6B99` | `#B4CBEA` |

### Alto contraste (extracto)

| Token | HC oscuro | HC claro |
|---|---|---|
| `--dsw-alias-bg-base` | `#101113` | `#FFF0F5` |
| `--dsw-alias-bg-layer-2` | `#4a4253` | `#F4E7ED` |
| `--dsw-alias-label-primary` | `#FFF0F5` | `#101113` |
| `--dsw-alias-label-secondary` | `#D0E0F0` | `#2E2935` |
| `--dsw-alias-label-tertiary` | `#BAC3BF` | `#4A4452` |
| `--dsw-alias-brand-primary` | `#B4CBEA` | `#4F6B99` |
| `--dsw-alias-link` | `#B4CBEA` | `#3F5C86` |
| `--dsw-alias-border-l1` | `#4a425380` | `#4a425340` |
| `--dsw-alias-border-l2` | `#4a4253A0` | `#4a425359` |
| `--dsw-alias-border-l3` | `#4a4253` | `#4a425373` |
| `--dsw-alias-state-error-primary` | `#E8A79B` | `#8A2F24` |
| `--dsw-alias-state-warn-primary` | `#FFF0F5` | `#8A3B2E` |
| `--dsw-alias-state-success-primary` | `#BCE7C6` | `#1F5434` |
| `--dsw-alias-state-business-primary` | `#B4CBEA` | `#3F5C86` |
| `--dsw-alias-interactive-bg-hover` | `#4a425380` | `#4a425324` |
| `--dsw-alias-interactive-bg-active` | `#4a4253A0` | `#4a425338` |
| `--dsw-alias-switch-thumb` | `#FFF0F5` | `#101113` |

El resto de las sustituciones de alto contraste está en `theme.json → highContrast` y `syntax-highlighting.json → highContrast`.

### Todos los valores únicos

Los 118 tokens de interfaz, los 11 de sintaxis, las dos paletas ANSI y las variantes de alto contraste usan exactamente estos **96 valores**. La asignación token por token está en los dos JSON; esta tabla es el inventario completo de literales de color del tema.

| Valor | Valor | Valor | Valor |
|---|---|---|---|
| `#00000000` | `#00000033` | `#0000007A` | `#00000080` |
| `#000000E0` | `#101113` | `#1011131F` | `#10111326` |
| `#1011133D` | `#1011137A` | `#1F5434` | `#272730B3` |
| `#2E2935` | `#2E3833` | `#2F6B45` | `#2F6B4514` |
| `#2F6B4526` | `#2F6B4533` | `#35566B` | `#3A2F5C` |
| `#3A3542` | `#3A3A44` | `#3F4A43` | `#3F5C86` |
| `#4a4253` | `#4a42530A` | `#4a425314` | `#4a425320` |
| `#4a425324` | `#4a425326` | `#4a425338` | `#4a425340` |
| `#4a425359` | `#4a425360` | `#4a425373` | `#4a425380` |
| `#4a4253A0` | `#4A4452` | `#4B3F73` | `#4C6B7D` |
| `#4C8A62` | `#4F5A53` | `#4F6B99` | `#5A5163` |
| `#5A5A64` | `#5F7E93` | `#62548A` | `#6E4F4D` |
| `#6E6875` | `#6F87B5` | `#6F87B580` | `#7A5A54` |
| `#8A2F24` | `#8A3B2E` | `#8A8494` | `#8FA6B4` |
| `#8FA8CD` | `#8FA8CD26` | `#8FA8CD33` | `#8FA8CD40` |
| `#8FA8CD80` | `#9E5546` | `#9E554626` | `#9FA6A1` |
| `#A34A3E` | `#A34A3E14` | `#A34A3E26` | `#A34A3E33` |
| `#A5AAB2` | `#A699C1` | `#A88684` | `#B4CBEA` |
| `#B4CBEA40` | `#BAC3BF` | `#BCE7C6` | `#BCE7C61A` |
| `#BCE7C633` | `#C2675A` | `#C3B6DE` | `#C67C6B` |
| `#D0E0F0` | `#D0E0F580` | `#D1B2B0` | `#D48F83` |
| `#D48F831A` | `#D48F8326` | `#D48F8333` | `#E8A79B` |
| `#E8A79B33` | `#F4E7ED` | `#F7EAF0` | `#FBEEF3` |
| `#FFF0F5` | `#FFF0F526` | `#FFF0F533` | `#FFF0F5B3` |
| `#FFF8FB` |  |  |  |

El icono del plugin usa además el tono `#8A76B8` en uno de sus degradados.

---

## Estructura del paquete

```text
xen-theme/
├── package.json                  Manifiesto del bundle y declaración del cliente
├── cordis.patch.yml              Fila del plugin en el perfil
├── index.js                      Mitad Host: sirve las paletas en /xen-theme/
├── client.js                     Mitad Cliente: tokens, estilos, fila y comandos
├── theme.json                    Colores de interfaz (118 tokens × 2 esquemas) y tamaños
├── syntax-highlighting.json      ANSI de 16 colores y variables --shiki-*
├── styles.css                    Fuentes, interlineado, selección y detalles de código
├── locale/
│   ├── en.json                   Título y descripción del plugin en inglés
│   └── es.json                   Título y descripción del plugin en español
├── icon.svg                      Icono original del bundle
├── theme-studio/
│   └── xen-theme.preset.json     Backup importable en dsh-theme-studio
├── scripts/
│   └── build-client.mjs          Valida la paleta, genera el respaldo y el preset
├── GITHUB.md                     Guía para publicar el repositorio y usarlo en otro equipo
├── README.md                     Este documento
└── LICENSE                       MIT
```

**Sobre el formato:** DeepSeek Harness no instala un plugin leyendo `theme.json` y `styles.css` por sí solo; un bundle necesita `package.json`, una fila en el patch y una mitad Cliente que consuma las APIs reales (`ctx.theme`, `ctx.slots`, `ctx.commandUi`). Por eso este paquete incluye esos archivos de runtime **además** de los tres archivos de configuración pedidos, que son los que de verdad contienen la paleta y se pueden editar.

---

## Compatibilidad y estado de verificación

| Aspecto | Estado |
|---|---|
| Versión de DSH verificada | `0.2.2-rc.3` (DeepSeek Harness Desktop, perfil `desktop`, noviembre de 2026) |
| APIs usadas | `ctx.theme.overrideTokens`, `ctx.slots.inject/register`, `ctx.commandUi.register`, `ctx.locale.register/bind`, `ctx.webServer.register` |
| `engines.dsh` | `>=0.2.2-rc.3 <0.3.0` |
| Requisito original del pedido | `0.1.0-rc.5` o superior — **no verificado** |
| Dependencias externas | Ninguna |
| Scripts de instalación | Ninguno (no hay `prepare`, `postinstall` ni compilación) |
| Red | Solo peticiones al mismo origen bajo `/xen-theme/` |

La especificación original pedía compatibilidad con DSH `0.1.0-rc.5` o superior. La instalación disponible para construir y probar este plugin es `0.2.2-rc.3`; las APIs de tema, slots y comandos se comprobaron contra esa versión leyendo los paquetes instalados. Declarar `0.1.0-rc.5` sin poder probarlo sería una afirmación no verificada, así que `engines.dsh` refleja la versión comprobada. Si necesitas soportar una versión anterior, revisa que existan `overrideTokens` y `commandUi` y ajusta `engines`.

**Qué se comprobó:** sintaxis de todos los módulos, validez de los JSON, correspondencia de los 118 tokens entre esquemas, longitud de las paletas ANSI, registro del bundle, respuestas 200/404 de la ruta Host, activación de la capa de tokens (el token de inspección `--xen-theme-state` aparece en la inspección de tema) y registro de la fila de ajustes en la instancia en ejecución. **Qué no se pudo comprobar:** el aspecto renderizado en pantalla (esta sesión no tiene control del navegador). Abre **Ajustes → General** y un bloque de código para confirmar visualmente los colores y las fuentes.

---

## Limitaciones conocidas

- **El terminal no usa la paleta ANSI.** El terminal de la barra lateral (xterm) solo toma del tema el fondo, el texto y el cursor; sus 16 colores ANSI son propios. Las variables `--xen-ansi-*` quedan disponibles para CSS, pero no reasignan el terminal. Cambiarlo requeriría una API que DeepSeek Harness no expone hoy.
- **El resaltado de código depende de Shiki.** Se recolorean los bloques de código cercados que el cliente renderiza con el tema `css-variables`. El texto plano, las tablas y los diffs usan tokens de interfaz, no `--shiki-*`.
- **El modo claro es derivado.** La especificación solo fijaba cuatro valores claros (fondo, texto y selección). El resto se calculó para conservar contraste sobre `#FFF0F5`; si buscas otro equilibrio, edita `tokens.light`.
- **El tamaño de fuente es nativo, salvo la barra lateral.** XEN no sobrescribe la lectura ni el código: el botón **Tamaños 16/15** escribe 16/15 en Apariencia y luego puedes cambiarlos allí. La barra lateral tiene su propia escala (`--xen-sidebar-font-size`, 15 px por defecto) porque DSH no la expone en Apariencia. El resto de la interfaz (menús, botones) usa tamaños fijos de 13/14 px.
- **El estado es por navegador.** Activar o desactivar en una ventana no cambia otra ventana ni otro equipo. Es deliberado: son preferencias de vista, no configuración del perfil.
- **El preset de Theme Studio no aparece en su pestaña Presets.** Theme Studio 0.1.0 no tiene registro externo de presets; se importa por la sección Backup de esa misma pestaña.
- **Posible parpadeo inicial.** El plugin se aplica después del arranque del cliente, así que la primera pintura puede mostrar el tema por defecto durante un instante antes de que XEN tome el control.
- **Cobertura de tokens.** Se mapean los 118 tokens de alias y de componente de esta versión de DSH; cualquier variable nueva de una versión futura que no esté en `theme.json` conservará su valor por defecto. Añádela si quieres que XEN la pinte.

---

## Licencia

MIT. Consulta [LICENSE](LICENSE).
