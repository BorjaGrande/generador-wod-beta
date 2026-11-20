# Generador WOD 1.0.9 Beta — Optimización estímulo/fatiga

Aplicación web local e instalable como PWA. **No es un entrenamiento supervisado ni garantiza ausencia de interferencias.**

## Actualización desde 1.0.8

1. **Exporta una copia JSON** desde Registro antes de subir la actualización.
2. Descomprime el ZIP y sube **los 9 archivos de su raíz** al repositorio `generador-wod-beta` (sustituir los anteriores).
3. Haz commit y abre `https://borjagrande.github.io/generador-wod-beta/` conectado a Internet.
4. Comprueba la etiqueta **v1.0.9 BETA**. En iPhone, cierra la app por completo y reábrela si todavía muestra la versión anterior.
5. **No desinstales la PWA ni borres los datos del sitio.** Conserva el mismo origen (URL) y clave de almacenamiento `generador-wod-beta-v1`.

## Controles previos

Sólo para **Extra inteligente**, antes de generar:

- Fatiga: baja, **media** (por defecto) o alta.
- Molestias: **ninguna** (por defecto), piernas, hombros/tren superior, zona lumbar o tronco.
- Intensidad objetivo: controlado RPE 5–6, **productivo RPE 6–7** (por defecto), exigente RPE 7–8.

El usuario puede cambiar estos valores; se guardan junto con el estado local. El modo **Libre** conserva su comportamiento anterior.

## Algoritmo nuevo

- Analiza programación oficial de CrossFit importada (±2 días) y resultados registrados recientes; añade una penalización aproximada por exposición en los últimos seis días.
- Evalúa límites de carga por patrón: cardio, core, sentadilla, piernas/impacto, bisagra/cadena posterior, tracción, empuje, overhead y agarre. Los límites cambian según fatiga, molestias, intensidad de sesiones próximas y volumen anterior **estimado por categorías**, no medido en kilogramos o tonelaje real.
- Genera alternativas y rechaza las que superan los presupuestos, tienen volumen sin sentido, no caben en el intervalo o no alcanzan una densidad mínima plausible.
- Puntúa alternativas: estímulo/densidad 40%, compatibilidad 25%, presupuesto de volumen 20%, diversidad 15%; elige entre las mejores. La puntuación **no es un indicador clínico de seguridad**.
- Cuando es mejor recuperar, muestra la recomendación y **pide confirmación antes de generar contra ese consejo**, respetando los controles previos.
- FOR TIME incluye una estimación muy aproximada del tiempo, no una predicción individual. En otras modalidades se controla trabajo por estación y ciclos esperables.
- Si no hay opción razonable con el equipamiento, esfuerzos y restricciones declarados, **no inventa un WOD RPE 7**: sugiere recuperar, modificar parámetros o añadir material realmente disponible.
- Se conserva el objetivo seleccionado si la mezcla de dominios lo permite; si se adapta el estímulo, lo indica claramente.

## Registro y preservación

- Se conserva `generador-wod-beta-v1` en `localStorage` y el formato de programación `fecha;nombre;movimientos;rpe;notas` (CSV UTF-8).
- Se mantienen perfiles, inventario, habilidades, sesiones ORIGIN importadas, WODs anteriores, registros, último WOD y última recomendación. **No es necesario volver a importar ORIGIN** en el mismo navegador/origen con datos intactos.
- Los registros nuevos incluyen fatiga y molestias previas, intensidad objetivo, recuperación al día siguiente e impacto percibido en la próxima sesión oficial (opcionales). El historial antiguo sigue siendo válido.
- La copia JSON incluye estos nuevos datos. La restauración de copias de versiones anteriores añade valores por defecto de forma no destructiva.

## ORIGIN Strength

Para las pruebas, usar las sesiones originales del Excel **PLAN 2026**:
- Miércoles 18/11/2026 (26.97): Power/Hang Snatch + Overhead Squat; AMRAP con Power Snatch, Pull-ups y Running.
- Viernes 20/11/2026 (26.98): DB Shoulder Press 4×8 y FOR TIME 21-15-9 DB Thruster / Burpee Over DB.

**No se modifica ni se reescribe ningún WOD original de ORIGIN.** El Excel sólo sirve de origen para el CSV importado por el usuario; la app no sube ni publica el archivo personal. Las fechas del documento son orientativas y el RPE 7 asignado por defecto al CSV no es RPE real de la sesión.

## Límites explícitos

- Intensidad RPE estimada, no medida. El algoritmo no puede conocer la fatiga muscular real, las cargas reales de ORIGIN ni predecir daño o adaptaciones.
- El volumen por patrón es una puntuación heurística, no un cálculo de tonelaje ni un plan de periodización completo.
- No interpreta lesiones. Molestias relevantes exigen juicio individual y no se deben usar los WODs para entrenar con dolor.
- El historial sólo influye si hay registros locales; no se integran automáticamente entrenamientos de otras aplicaciones.
- Puede variar el resultado por selección aleatoria entre candidatos de calidad similar.
