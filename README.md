# Generador WOD · 1.0.0 Beta

Aplicación independiente de **Contador WOD 2.2**, desarrollada como PWA para iPhone y GitHub Pages.

## Funciones

- Un único generador con dos estrategias: **Libre** e **Inteligente**.
- Material configurable por perfiles, cantidades y carga máxima orientativa.
- Catálogo de movimientos, nivel técnico y habilidades.
- Programación oficial: importación de CSV o registro manual de sesiones.
- Generación de AMRAP, FOR TIME, EMOM y TABATA con filtros locales.
- Modo inteligente: exige sesiones oficiales a ±2 días de la fecha elegida y penaliza patrones recientemente exigidos. **No garantiza ausencia de interferencias**.
- Guardado local de WODs y resultados, incluyendo cargas, RPE, RX/escalado y notas.
- Exportación de registros a CSV y copia completa JSON.
- Modo offline tras una primera apertura conectada y carga exitosa de la caché.

## Instalación en GitHub Pages

1. Extrae el ZIP y sube todos los archivos, sin carpeta contenedora, a la raíz de `generador-wod-beta` en GitHub.
2. En **Settings > Pages**, configura **Deploy from a branch**, rama `main`, carpeta `/(root)`.
3. Abre `https://borjagrande.github.io/generador-wod-beta/` conectado a internet.
4. Abre una segunda vez para instalar la caché, y luego usa **Compartir > Añadir a pantalla de inicio** en Safari.
5. Sólo entonces prueba en modo avión. Los datos sólo permanecen en este navegador/dispositivo.

## Formato CSV de planificación

```csv
fecha;nombre;movimientos;rpe;notas
2026-11-20;Ejemplo;Thrusters y Pull-ups;7;Sustituir por datos reales
```

La programación no se rellena automáticamente a partir de conversaciones de ChatGPT. El usuario debe importar sus sesiones reales.

## Limitaciones previstas en la beta

- El generador es heurístico, sin conexión externa ni análisis clínico de fatiga. Las cargas y repeticiones son propuestas; verifica el peso según técnica y capacidad.
- La lista de material y habilidades debe representar recursos y competencias reales.
- No transfiere automáticamente una sesión ni un resultado desde o hacia Contador WOD; el botón abre el contador para configurarlo manualmente.
- No hay sincronización entre teléfonos, ni copias en la nube; exporta JSON periódicamente.
- No enviar datos personales a GitHub: el contenido de tu programación se guarda **sólo localmente** y no debe subirse como archivo público al repositorio.

## Versionado

La app beta utiliza la clave `generador-wod-beta-v1` y la caché `generador-wod-beta-cache-v1.0.0`; no modifica el repositorio ni el almacenamiento del Contador WOD.
