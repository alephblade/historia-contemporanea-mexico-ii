# Operación de GitHub Pages

## Estado actual

GitHub Pages está activo para el repositorio público `alephblade/historia-contemporanea-mexico-ii`:

- cuenta: `alephblade`;
- repositorio: `historia-contemporanea-mexico-ii`;
- visibilidad: pública;
- sitio: `https://alephblade.github.io/historia-contemporanea-mexico-ii/`;
- rama y fuente: `main` mediante GitHub Actions;
- `SITE_URL`: `https://alephblade.github.io`;
- `BASE_PATH`: `/historia-contemporanea-mexico-ii`;
- HTTPS: forzado;
- contenido original: CC BY-SA 4.0;
- código original: MIT;
- fuentes de terceros: excluidas salvo autorización o licencia compatible documentada.

`.github/workflows/pages.yml` está activo. La autorización operativa y el recorrido humano por teclado se registraron el 1 de septiembre de 2026 en `docs/AUTORIZACION_ACTIVACION_GITHUB_PAGES_2026-09-01.md`.

## Flujo de publicación

El flujo se ejecuta con cada envío a `main` y también admite ejecución manual:

1. recupera el repositorio;
2. instala Node.js, Python y las dependencias reproducibles;
3. ejecuta `npm test` con la URL y ruta base del sitio;
4. prepara exclusivamente `dist/` como artefacto; y
5. despliega mediante las acciones oficiales de GitHub Pages.

El flujo conserva permisos mínimos: lectura del contenido, escritura de Pages y emisión del token de identidad requerido por el despliegue. No contiene secretos ni credenciales.

## Verificación después de cada cambio

Antes de enviar cambios relevantes, ejecute:

```powershell
$env:SITE_URL = "https://alephblade.github.io"
$env:BASE_PATH = "/historia-contemporanea-mexico-ii"
npm test
Remove-Item Env:SITE_URL
Remove-Item Env:BASE_PATH
```

Después del envío, confirme que los flujos `Validación y construcción` y `Publicar en GitHub Pages` concluyan correctamente. Verifique al menos la portada, el catálogo de lecturas, una ruta profunda de orientación y el logotipo. Una falla de CI o de construcción impide que el flujo prepare un nuevo artefacto publicable.

## Cambios de dominio o ruta

Si cambia el nombre del repositorio, la cuenta o se adopta un dominio propio, actualice de manera coordinada las variables `SITE_URL` y `BASE_PATH`, ejecute la prueba local anterior y documente la decisión. Para un dominio propio o un repositorio especial de cuenta, `BASE_PATH` puede ser `/`; para un sitio de proyecto conserva la forma `/nombre-del-repositorio`.
