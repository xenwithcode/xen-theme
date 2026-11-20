# Publicar XEN THEME en GitHub y usarlo en otro equipo

Esta guía es para alguien que nunca ha subido un proyecto a GitHub. La carpeta `xen-theme` ya está preparada: tiene el `package.json` en la raíz, un `.gitignore`, la licencia y un commit inicial. Solo falta crear el repositorio remoto y subirlo.

> **Importante:** el repositorio debe contener **el contenido** de la carpeta `xen-theme`, no una carpeta `xen-theme` dentro de otra. En GitHub tiene que verse `package.json` en la raíz del repositorio.

---

## 1. Crear el repositorio y subir el código

### Opción A — GitHub Desktop (recomendada si no usas la terminal)

1. Descarga e instala **GitHub Desktop** desde <https://desktop.github.com> e inicia sesión con tu cuenta `xenwithcode`.
2. En GitHub Desktop: **File → Add local repository…**
3. Elige esta carpeta:
   `/Users/macbook/Documents/deepseek-harness/default-workspace/xen-theme`
4. Como ya tiene un repositorio Git local, GitHub Desktop la abre directamente.
5. Pulsa **Publish repository**.
   - **Name:** `xen-theme`
   - **Description:** `XEN THEME para DeepSeek Harness`
   - **Keep this code private:** desmárcalo si quieres instalarlo sin autenticación en el otro equipo. Un repositorio público es lo más sencillo.
6. Pulsa **Publish repository**. En unos segundos estará en:
   `https://github.com/xenwithcode/xen-theme`

### Opción B — Terminal con `gh` (GitHub CLI)

Ya tienes `gh` instalado y autenticado como `xenwithcode`:

```sh
cd "/Users/macbook/Documents/deepseek-harness/default-workspace/xen-theme"
gh repo create xen-theme --public --source=. --remote=origin --push
```

Eso crea el repositorio, añade `origin` y sube la rama `main`.

### Opción C — Crear el repositorio en la web y subir con `git`

1. En <https://github.com/new> crea un repositorio llamado `xen-theme`.
   No marques “Add a README”, “Add .gitignore” ni “Choose a license”: ya los tenemos.
2. En la terminal:

```sh
cd "/Users/macbook/Documents/deepseek-harness/default-workspace/xen-theme"
git remote add origin https://github.com/xenwithcode/xen-theme.git
git push -u origin main
```

Si `origin` ya existe y quieres cambiar la URL:

```sh
git remote set-url origin https://github.com/xenwithcode/xen-theme.git
git push -u origin main
```

---

## 2. Comprobar que se subió bien

Abre en el navegador:

```text
https://github.com/xenwithcode/xen-theme
```

Debes ver, en la raíz del repositorio:

```text
package.json
cordis.patch.yml
index.js
client.js
theme.json
syntax-highlighting.json
styles.css
locale/
theme-studio/
scripts/
icon.svg
README.md
GITHUB.md
LICENSE
```

Si ves una carpeta `xen-theme/` dentro del repositorio, has subido la carpeta padre por error. Mueve los archivos a la raíz del repositorio y vuelve a hacer commit.

---

## 3. Instalarlo en el otro PC/laptop

### Opción sin terminal (Desktop)

1. En el otro equipo, abre <https://github.com/xenwithcode/xen-theme>.
2. Pulsa **Code → Download ZIP**.
3. Descomprime el ZIP. Obtendrás una carpeta `xen-theme` con `package.json` dentro.
4. Abre DeepSeek Harness.
5. Ve a **Plugins** en la barra lateral → **Add plugin**.
6. Selecciona la carpeta `xen-theme` (la que contiene `package.json`), no la carpeta padre.
7. Confirma la instalación y recarga la página.
8. Abre **Ajustes → General**: debe aparecer la fila **XEN THEME**. Escribe `/xen` para activarlo o desactivarlo.

### Opción con la CLI de DSH

Si en el otro equipo tienes el comando `dsh` disponible:

```sh
dsh plugin --profile desktop add github:xenwithcode/xen-theme
```

Si tu pnpm no reconoce `github:`, usa la URL completa:

```sh
dsh plugin --profile desktop add git+https://github.com/xenwithcode/xen-theme.git
```

Después recarga la página del navegador. Para desinstalarlo:

```sh
dsh plugin --profile desktop remove xen-theme
```

> En DeepSeek Harness Desktop, si `dsh` no está en el `PATH`, usa la opción sin terminal (**Plugins → Add plugin**).

---

## 4. Actualizar el tema más adelante

1. Edita los archivos en tu laptop principal (`theme.json`, `syntax-highlighting.json`, `styles.css`).
2. Si cambias `styles.css` o `theme.json`, el plugin instalado localmente ya los lee al recargar. Para que el repositorio quede actualizado:
   - GitHub Desktop: escribe un resumen → **Commit to main** → **Push origin**.
   - O en la terminal:
     ```sh
     cd "/Users/macbook/Documents/deepseek-harness/default-workspace/xen-theme"
     git add -A
     git commit -m "Ajustes de XEN THEME"
     git push
     ```
3. En el otro equipo, vuelve a instalar la versión nueva:
   - Descarga el ZIP otra vez y usa **Plugins → Add plugin**, o
   - Con CLI: `dsh plugin --profile desktop remove xen-theme` y luego `dsh plugin --profile desktop add github:xenwithcode/xen-theme`.

Sube la versión en `package.json` (`"version": "1.0.0"` → `1.0.1`) cuando publiques cambios importantes; así es fácil distinguir versiones.

---

## 5. Problemas comunes

**“No es un bundle” / no aparece en Plugins.**
Seleccionaste una carpeta que no contiene `package.json`, o subiste la carpeta padre. Selecciona la carpeta correcta.

**“engines.dsh” o incompatibilidad de versión.**
XEN THEME declara `>=0.2.2-rc.3 <0.3.0`. Actualiza DeepSeek Harness en el otro equipo. Si tu versión es anterior, el gestor de plugins puede rechazarlo.

**El repositorio es privado y falla la instalación desde GitHub.**
Un repositorio público evita la autenticación. Si lo quieres privado, instala desde el ZIP local con **Plugins → Add plugin**, o configura credenciales de Git en el otro equipo.

**El tema no cambia tras instalarlo.**
Recarga la página. Revisa **Ajustes → General → XEN THEME** y que el interruptor esté activo. Si acabas de instalar, puede hacer falta reiniciar la app.

**Quiero cambiar colores o el tamaño de la sidebar.**
- Colores: `theme.json` y `syntax-highlighting.json`.
- Fuentes, interlineado y sidebar: `styles.css` (`--xen-sidebar-font-size`).
- Tamaño de lectura/código: **Ajustes → Apariencia** o el botón **Tamaños 16/15** de la fila XEN.

---

## 6. Seguridad y licencia

- El repositorio público muestra el código; el plugin no contiene secretos, credenciales ni datos personales.
- La licencia es MIT (archivo `LICENSE`). Puedes cambiar el titular si quieres.
- No subas nunca a este repositorio tu `cordis.patch.yml` del perfil, tokens ni claves.

---

## 7. Estructura mínima que GitHub necesita

```text
xen-theme/                  ← raíz del repositorio
├── package.json            ← imprescindible, en la raíz
├── cordis.patch.yml
├── index.js
├── client.js
├── theme.json
├── syntax-highlighting.json
├── styles.css
├── locale/
├── icon.svg
└── ...
```

Con eso, `github:xenwithcode/xen-theme` es instalable tanto con la CLI como desde **Plugins → Add plugin** usando el ZIP.
