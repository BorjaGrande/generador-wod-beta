# Generador WOD · 1.0.15 Beta — Análisis de resultados reales

Versión incremental de `1.0.14`, compatible con el **Contador WOD 2.2.3**, sin cambios en su repositorio ni en el protocolo de enlace.

## Nuevo panel: Registro → Análisis de resultados

- **Resultados registrados** y número que procede del Contador WOD.
- **RPE real medio** y distribución entre esfuerzo *por debajo / dentro / por encima* del intervalo objetivo, solo cuando el objetivo se conserva en el WOD o registro. Una sesión sin objetivo comparable no cuenta como error del algoritmo.
- **Rendimiento por formato**: número de sesiones y RPE real observado por FOR TIME, AMRAP, EMOM y TABATA.
- **Tiempos FOR TIME**: muestra estimación guardada y tiempo medido únicamente para ejecuciones enlazadas al Contador, detenidas manualmente y con al menos las rondas previstas marcadas. Las vueltas anotadas no acreditan por sí solas una finalización válida. **Nunca considera el CAP ni un resultado escrito manualmente como tiempo de finalización verificado**.
- **Calidad y recuperación**: cuántos resultados tienen pesos, recuperación posterior e impacto declarado en la siguiente sesión oficial.
- Aviso de **muestra pequeña** hasta alcanzar cinco registros; el umbral sirve para orientar la lectura del panel, **no es una validación científica**.

Los cálculos son **descriptivos**. No corrigen automáticamente las dosis, porcentajes, RPE, duración, selección de ejercicios, ni la programación oficial ORIGIN. Aun con suficientes registros, una asociación entre WOD y fatiga no demuestra causalidad.

## Conservación de datos

- Se mantiene la clave de almacenamiento `generador-wod-beta-v1`, la estructura de los registros, y la importación de ORIGIN sin cambios.
- El panel calcula los datos sobre la marcha a partir de los resultados guardados; **no almacena ni modifica estadísticas en el registro**.
- Mantiene la importación de resultados del Contador, el botón **Abrir contador WOD**, **Compartir WOD**, **Guardar WOD**, la biblioteca de CrossFit y los perfiles de material y habilidades.
- Cuando iOS abre el Generador instalado y Safari en contextos de almacenamiento distintos, cada instancia ve únicamente **su historial local**. Una sesión recibida sin la predicción original conservada en ese contexto se excluye de la comparación de tiempo, pero sigue contando en las demás métricas.

## Instalación desde 1.0.14

1. Desde Registro, exportar una copia JSON actualizada; conservarla fuera de la aplicación.
2. Descomprimir el ZIP y subir los **11 archivos** a la raíz del mismo repositorio `borjagrande/generador-wod-beta` (incluido el nuevo `analytics.mjs`).
3. Confirmar en GitHub (**Commit changes**).
4. Abrir la PWA con conexión, cerrarla por completo y abrirla otra vez; comprobar **v1.0.15 BETA**.
5. Entrar en **Registro → Análisis de resultados**. Los resultados existentes se analizan automáticamente. No es necesario importar otra vez ORIGIN.

No borrar almacenamiento, no eliminar el icono PWA y no subir tu copia JSON privada al repositorio público.

## Pruebas realizadas

- Análisis con datos vacíos, un registro, varios registros, entrada manual sin cronómetro, límite por tiempo, rondas insuficientes, RPE por debajo/dentro/encima del objetivo y recuperación registrada.
- Importación de las 104 sesiones del CSV ORIGIN y migración de perfiles, WODs y resultados antiguos.
- Verificación de que `core.mjs` mantiene **exactamente la lógica de generación de 1.0.14**, salvo versión y referencia de caché.
- Revisión sintáctica de módulos JS y de la estructura del ZIP.
- La ejecución visual automatizada en Chromium no pudo completarse por bloqueo de navegación en el entorno; la validación funcional final del panel debe hacerse en el iPhone.

## Contador WOD

No necesita actualizarse. La versión compatible es **2.2.3**, ya validada con Generador 1.0.14.
