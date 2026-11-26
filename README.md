# Generador WOD · 1.0.21 Beta — Objetivo FOR TIME y descarte limpio

Actualización sobre 1.0.20 Beta. Envía el número de rondas del FOR TIME al Contador 2.2.5 Beta, tanto en parámetros como en la ficha del WOD. Acepta la nueva causa de finalización por objetivo; conserva compatibilidad con resultados antiguos. La comparación FOR TIME exige exactamente las rondas previstas, un tiempo medido válido y una estimación previa; no incluye CAP ni resultados con exceso de marcas. Al descartar una importación se limpia el formulario de resultado, RPE, pesos, observaciones y selecciones de valoración, sin eliminar registros guardados ni el WOD. También se reinicia la valoración al recibir una importación nueva para no arrastrar valores anteriores. La selección del WOD puede seguir visible para registrar otra ejecución manual. Se mantiene el algoritmo de generación, catálogo, editor y clave de almacenamiento.

Instalación: exportar copia JSON privada; actualizar primero `contador-wod-beta` a 2.2.5 Beta; reemplazar los 11 archivos de la raíz de `generador-wod-beta` con este ZIP. Abrir con conexión hasta comprobar v1.0.21 BETA. No publicar en los repositorios estables ni borrar los datos locales.

Validación: sintaxis y pruebas automatizadas Node.js de enlace, recepción de objetivo, comparación de resultados y controlador de descarte con DOM simulado. La navegación local de Chromium está bloqueada por el entorno; pendiente validación en iPhone y guardado definitivo de prueba. No publicado en GitHub.

---

# Generador WOD · 1.0.20 Beta — Enlace al Contador Beta

Corrección puntual sobre 1.0.19 Beta: «Abrir contador WOD» apunta a `https://borjagrande.github.io/contador-wod-beta/`. Se conservan los parámetros del cronómetro, la ficha del WOD en el fragmento y el protocolo de resultados. El ZIP del Contador 2.2.4 Beta ya devuelve los resultados a `https://borjagrande.github.io/generador-wod-beta/`; no requiere modificaciones. Se actualizan las versiones de recursos y de caché del Generador, sin borrar el almacenamiento local ni cambiar el algoritmo, el editor o el catálogo.

Instalación: exportar copia JSON privada, reemplazar los 11 archivos en la raíz del repositorio `generador-wod-beta`, confirmar commit y abrir con conexión hasta ver v1.0.20 BETA. No publicar en repositorios estables. No actualizar el Contador. No borrar datos de navegación.

Validación: pruebas de sintaxis y de ida y vuelta del protocolo para AMRAP, FOR TIME, EMOM y TABATA por bloques con Node.js, usando las funciones del Contador 2.2.4 Beta. Pendiente de validación visual y de navegación real en iPhone. No publicado en GitHub.

---

# Generador WOD · 1.0.19 Beta — Corrección del buscador

Actualización incremental sobre 1.0.18. Los acrónimos completos DU, SU, HSPU, HSW, T2B, C2B, BMU, RMU, DB y KB tienen significado explícito; DU no devuelve mancuernas. DB y KB buscan por requisito de material. Los resultados incompatibles aparecen como información no seleccionable, con motivos concretos: material, habilidad, nivel, referencia técnica o formato. Se mantiene el algoritmo, el catálogo de 138 fichas, el almacenamiento y el protocolo del Contador. No se rebajan automáticamente requisitos. Los pesos y alturas no se cuantifican en el modelo de carga.

Instalación: exportar copia JSON privada, reemplazar los 11 archivos de la raíz del repositorio del Generador, abrir con conexión y volver a abrir hasta ver v1.0.19 BETA. No modificar el Contador. Validar DU/HSPU/SkiErg con requisitos activos e inactivos, DB/KB, sustitución y enlace EMOM. No publicado ni probado visualmente en iPhone.

---

# Generador WOD · 1.0.18 Beta — Editor compacto y biblioteca

Actualización incremental sobre la 1.0.17 Beta validada. Se mantiene la clave de almacenamiento `generador-wod-beta-v1`, el protocolo del Contador y los filtros de material, nivel, habilidades y formato.

## Novedades

- Editor con movimientos plegados por defecto; pulsa una fila para editar sus atributos, buscar, duplicar o eliminar. Flechas de orden siempre visibles. Añadir abre una fila editable con búsqueda.
- Búsqueda local por nombres, variantes, abreviaturas (HSPU, HSW, T2B, DU, C2B, DB/KB) y algunos sinónimos. La biblioteca ofrece filtros de material y habilidad.
- 138 fichas (antes 122); 119 elegibles para generación según requisitos (antes 106). Nuevas fichas: Shuttle Run, Hand-release Push-up, Burpee Pull-up, Box Jump-over, Box Step-over, KB Goblet Squat, KB Deadlift, KB Farmers Carry, DB Suitcase Carry, DB Box Step-up, DB Row, Sandbag Carry y Reverse Lunge. Snatch Pull, Snatch High Pull y Clean Pull son referencias técnicas, no candidatos automáticos. Las fichas añadidas son resúmenes editoriales, no una verificación individual de vídeo oficial.
- Alternativas de sustitución orientativas: patrón, modalidad de estímulo, dificultad y tiempo estimado. Al seleccionar se recalcula la cantidad aproximada y se limpian peso/altura para evitar arrastrar prescripciones incompatibles. Las alternativas no garantizan estímulo equivalente ni compatibilidad con la fatiga; al aplicar se mantienen las validaciones y avisos del motor. No se ha modificado la ponderación general del algoritmo ni se han aumentado artificialmente las frecuencias de habilidades avanzadas.
- Márgenes del diálogo mediante áreas seguras iOS; validación visual en dispositivo pendiente.

## Instalación

1. Exportar copia JSON privada desde Registro.
2. Descomprimir y reemplazar los 11 archivos de la raíz del repositorio beta del Generador; no cambiar el repositorio del Contador ni subir la copia privada.
3. Abrir con conexión, cerrar y volver a abrir hasta que se muestre v1.0.18 BETA. No borrar datos.
4. Generar AMRAP, abrir editor y comprobar filas plegadas. Buscar DU, HSPU o HSW (habilitar material, nivel y habilidades pertinentes). Probar sustitución, cantidad, orden, duplicado, eliminación, cancelar/aplicar y enlace al Contador. Revisar filtros de biblioteca y modo sin conexión.

## Validación y límites

Comprobación de sintaxis JS, 80 generaciones y ediciones en modo libre (20 por formato), búsquedas, requisitos, alternativas y enlace al cronómetro desde el motor. El entorno bloqueó la navegación de Chromium, por lo que no se ha verificado el flujo visual en un navegador real, Safari ni la PWA instalada. Los kilos y alturas siguen sin cuantificarse en el modelo. El aumento del catálogo modifica el conjunto de candidatos, no demuestra un aumento de frecuencia de cada movimiento. No publicado en GitHub.

---

# Generador WOD · 1.0.17 Beta — Editor de WODs

Actualización incremental sobre el ZIP 1.0.16 Beta suministrado. No modifica el repositorio del Contador WOD, ni el algoritmo de selección automática, ni la clave de almacenamiento local `generador-wod-beta-v1`.

## Editor

Después de generar un WOD, pulsa **Editar WOD** (debajo de Abrir contador WOD, Compartir WOD y Guardar WOD). El editor permite:

- Cambiar duración AMRAP, CAP y rondas FOR TIME, duración e intervalo EMOM, bloques TABATA y pausa entre bloques. Se mantiene el estándar TABATA de 8 × 20/10 por bloque.
- Sustituir, añadir, eliminar, duplicar y reordenar movimientos mediante flechas. Se usa el catálogo existente y el perfil de material activo; únicamente aparecen movimientos disponibles para el nivel, habilidades, material y formato. Límite: 8 movimientos o 6 bloques TABATA por compatibilidad con el protocolo del Contador.
- Editar la cantidad según la unidad propia del ejercicio (repeticiones, metros, calorías, segundos o ascensos). Peso y altura son atributos opcionales cuando el catálogo identifica material adecuado. En TABATA se mantiene el trabajo por tiempo, no un objetivo de repeticiones fijo.
- Añadir nombre y notas. Consultar una estimación recalculada de carga relativa por patrón y tiempo; en modo inteligente, comprobar presupuestos y avisos según programación oficial, resultados y estado previo.
- Aplicar o cancelar. Aplicar asigna un identificador nuevo al WOD; no modifica los WOD guardados ni los registros anteriores. La edición pasa a ser el último WOD local y puede guardarse expresamente, compartirse o abrir el Contador con la nueva configuración.

## Límites y decisiones

- No se cambia de formato dentro del editor en esta fase. Los atributos de cantidad se mantienen en la unidad del catálogo. La búsqueda avanzada y sustituciones inteligentes se dejan para la fase de biblioteca.
- Una edición manual no ha pasado por el optimizador de selección: se elimina su puntuación anterior y se muestra su nueva estimación. Los avisos de interferencia o tiempo requieren confirmación explícita; no se garantiza compatibilidad ni RPE. Los kilos y altura se conservan y se incluyen en texto y transferencia; no están incorporados cuantitativamente al modelo de carga. El modo libre no evalúa interferencias. Las estimaciones de ritmo son orientativas.
- El perfil de material activo se muestra en el editor. Se mantiene el estado previo del WOD inteligente. No se altera ORIGIN ni se cuentan WODs editados como realizados.

## Instalación y validación

1. Exportar copia JSON desde Registro y conservarla de forma privada.
2. Descomprimir este ZIP. Subir los 11 archivos a la raíz del repositorio beta del Generador, conservando los nombres; confirmar el commit. No subir la copia JSON.
3. Abrir con conexión, cerrar completamente y abrir de nuevo. Confirmar que la cabecera indica **v1.0.17 BETA**. No borrar datos ni eliminar la PWA.
4. Generar un AMRAP, cambiar duración y dosis, añadir/duplicar/reordenar/eliminar un ejercicio. Cancelar y comprobar que el original sigue igual; volver a editar y aplicar. Compartir, guardar y abrir el Contador con el tiempo nuevo.
5. Repetir con FOR TIME (CAP y rondas), EMOM (intervalos completos) y TABATA (bloques y pausas). Verificar un WOD inteligente con avisos, la persistencia tras cerrar la app y los registros anteriores.

**Pruebas realizadas:** sintaxis JS y pruebas del motor para los cuatro formatos, enlace de configuración, texto compartido, conservación de datos, cantidades, peso máximo, altura, intervalos incompatibles y avisos de presupuesto. La prueba automatizada en navegador no pudo ejecutarse debido al bloqueo de navegación del entorno. Falta la validación funcional en iPhone y la comprobación del enlace real con Contador 2.2.3. No se ha publicado en GitHub.

---

## Notas históricas de la versión 1.0.16

# Generador WOD · 1.0.16 Beta — Corrección de bloqueos y análisis de resultados

Actualización incremental de `1.0.15`, compatible con el **Contador WOD 2.2.3**, sin cambios en su repositorio ni en el protocolo de enlace.

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

## Instalación desde 1.0.15

1. Desde Registro, exportar una copia JSON actualizada; conservarla fuera de la aplicación.
2. Descomprimir el ZIP y subir los **11 archivos** a la raíz del mismo repositorio `borjagrande/generador-wod-beta` (incluido el nuevo `analytics.mjs`).
3. Confirmar en GitHub (**Commit changes**).
4. Abrir la PWA con conexión, cerrarla por completo y abrirla otra vez; comprobar **v1.0.16 BETA**.
5. Entrar en **Registro → Análisis de resultados**. Los resultados existentes se analizan automáticamente. No es necesario importar otra vez ORIGIN.

No borrar almacenamiento, no eliminar el icono PWA y no subir tu copia JSON privada al repositorio público.

## Pruebas realizadas

- Análisis con datos vacíos, un registro, varios registros, entrada manual sin cronómetro, límite por tiempo, rondas insuficientes, RPE por debajo/dentro/encima del objetivo y recuperación registrada.
- Importación de las 104 sesiones del CSV ORIGIN y migración de perfiles, WODs y resultados antiguos.
- Verificación de la generación inteligente de 1.0.16 sobre la base de 1.0.15: conserva presupuestos de carga y requisitos de material y técnica, e incorpora reintentos con menor duración.
- Revisión sintáctica de módulos JS y de la estructura del ZIP.
- La ejecución visual automatizada en Chromium no pudo completarse por bloqueo de navegación en el entorno; la validación funcional final del panel debe hacerse en el iPhone.

## Contador WOD

No necesita actualizarse. La versión compatible es **2.2.3**, ya validada con Generador 1.0.14.


## Corrección 1.0.16: rechazos por combinación de duración y objetivo

- El análisis de interferencias usa exclusivamente **programación oficial y resultados realmente registrados**. WODs generados o guardados sin resultado no se contabilizan como carga, aunque el historial de generación sí influye en la variedad.
- El motor inteligente prueba primero la duración solicitada y, si ninguna opción respeta los límites, prueba duraciones menores (hasta un mínimo de 8 minutos para el mecanismo de rescate). No relaja requisitos de material, técnica, molestias o presupuesto de carga.
- El WOD resultante conserva la duración originalmente pedida y explica la reducción en las notas. Si ninguna opción es viable, el mensaje describe el bloqueo sin afirmar que se ha entrenado.
- Mantiene la misma clave de almacenamiento, las sesiones ORIGIN, las transferencias desde el Contador y el panel de análisis. No hace falta volver a importar la programación.
- **Precaución:** recortar automáticamente una duración no equivale a satisfacer el volumen o estímulo inicialmente solicitado. Revisa la duración del resultado antes de entrenar.
