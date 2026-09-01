# Preparación futura de GitHub Pages

## Estado actual

GitHub Pages no está activado y no existe remoto. Se han definido las siguientes condiciones de preparación, todavía no ejecutadas:

- cuenta inicial: `alephblade`;
- nombre previsto: `historia-contemporanea-mexico-ii`;
- visibilidad: pública;
- URL prevista: `https://alephblade.github.io/historia-contemporanea-mexico-ii/`;
- `SITE_URL`: `https://alephblade.github.io`;
- `BASE_PATH`: `/historia-contemporanea-mexico-ii`;
- contenido original: CC BY-SA 4.0;
- código original: MIT;
- fuentes de terceros: excluidas salvo autorización o licencia compatible documentada.

`.github/workflows/pages.yml.example` continúa deliberadamente inactivo.

## Decisiones previas obligatorias

La aceptación académica mediante constancia quedó registrada el 1 de septiembre de 2026. Antes de crear el remoto aún se requiere:

1. autorización operativa expresa para crear el repositorio en `alephblade`;
2. confirmación de la rama inicial y de publicación, prevista como `main`;
3. recorrido humano por teclado antes del primer despliegue.

## Activación controlada

Solo después de esas decisiones:

1. Crear el repositorio público `alephblade/historia-contemporanea-mexico-ii` y el remoto autorizado.
2. Configurar las variables de repositorio `SITE_URL` y `BASE_PATH`. Para un sitio de proyecto, `BASE_PATH` tendrá la forma `/nombre-del-repositorio`; para un dominio propio o un repositorio especial de cuenta puede ser `/`.
3. Renombrar `.github/workflows/pages.yml.example` a `.github/workflows/pages.yml`.
4. Revisar la rama objetivo de la plantilla.
5. En GitHub, seleccionar **GitHub Actions** como fuente de Pages.
6. Ejecutar primero CI y revisar el artefacto; después autorizar la primera ejecución de despliegue.

La plantilla construye desde cero, ejecuta las mismas validaciones locales y usa exclusivamente las acciones oficiales `actions/configure-pages`, `actions/upload-pages-artifact` y `actions/deploy-pages` para Pages. No contiene secretos ni credenciales.

## Verificación previa sin publicar

La compatibilidad con una ruta base puede probarse localmente sin activar Pages:

```powershell
$env:BASE_PATH = "/repositorio-prueba"
$env:SITE_URL = "https://ejemplo.invalid"
npm test
Remove-Item Env:BASE_PATH
Remove-Item Env:SITE_URL
```

El dominio `.invalid` se usa solo para generar metadatos de prueba y no representa una decisión institucional.
