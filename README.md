# Generador WOD · 1.0.4 Beta

Aplicación independiente de **Contador WOD 2.2**, desarrollada como PWA para iPhone y GitHub Pages.

## Funciones

- Un único generador con dos estrategias: **Libre** e **Inteligente**.
- Material configurable por perfiles, cantidades y carga máxima orientativa.
- Catálogo de movimientos, nivel técnico y habilidades.
- Programación oficial: importación de CSV o registro manual de sesiones.
- Generación de AMRAP, FOR TIME, EMOM y TABATA con filtros locales.
- Modo inteligente: exige sesiones oficiales a ±2 días, protege patrones sobrecargados y puede recomendar recuperación sin generar WOD. **No garantiza ausencia de interferencias**.
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

La app beta utiliza la clave `generador-wod-beta-v1` y la caché `generador-wod-beta-cache-v1.0.3`; no modifica el repositorio ni el almacenamiento del Contador WOD.


## Ajuste v1.0.1 Beta — diseño en iPhone

- Los campos **Fecha del WOD** y **Perfil de material** aparecen en dos filas independientes en pantallas pequeñas para evitar que el selector de fecha se superponga al perfil.
- Las fechas de Programación y Registro también tienen ancho completo en móvil.
- No se modifica la lógica del generador ni la clave de almacenamiento `generador-wod-beta-v1`.
- Se incrementa la versión de caché offline a `generador-wod-beta-cache-v1.0.3`.
- Para actualizar: sube los nueve archivos a la raíz del mismo repositorio, conecta el iPhone a internet, abre la app y ciérrala/ábrela de nuevo para que se actualice la caché. No elimines el icono ni borres datos de Safari.


## Ajuste v1.0.2 Beta — ancho del selector de fecha en Safari iOS

- Corrige el desbordamiento horizontal del campo **Fecha del WOD** en iPhone detectado en la v1.0.1.
- Mantiene Fecha del WOD y Perfil de material en filas independientes en pantallas pequeñas.
- Ajusta la apariencia y las dimensiones del selector nativo, con contención defensiva del campo en el formulario.
- Aplica el mismo tratamiento a los selectores de fecha de Programación y Registro.
- No cambia la generación, inventario, historial, datos guardados ni la clave de almacenamiento `generador-wod-beta-v1`.
- Actualiza la caché offline a `generador-wod-beta-cache-v1.0.3`.
- Antes de actualizar, exporta una copia JSON desde **Registro → Copias de seguridad**, como medida preventiva.
- Publicación: subir los nueve archivos descomprimidos a la raíz del repositorio `generador-wod-beta`.
- Prueba: abrir primero en Safari **privado** para observar el diseño, después en la app instalada con conexión. Cerrar y volver a abrir la aplicación para actualizar sus recursos. **No borrar los datos del sitio ni desinstalar la app.**
- La corrección se ha comprobado estáticamente; debe validarse en un iPhone real.


## Cambio v1.0.3 Beta — algoritmo de generación

- Equilibra patrones principales: máximo un movimiento dominante de sentadilla, bisagra de cadera u overhead por WOD, salvo que el movimiento incluya varios patrones por sí mismo.
- El objetivo mixto busca variedad de cardio, carga y gimnasia/core cuando el material y los movimientos permitidos lo hacen posible.
- EMOM calcula dosis aproximadas de 25–45 segundos de trabajo por estación, **no garantías de tiempo real**. No recomienda ejercicios sin dosis adecuada en el minuto.
- AMRAP/FOR TIME ajustan repeticiones de movimientos rápidos de cardio (por ejemplo, Jumping Jacks) y moderan movimientos técnicamente exigentes.
- TABATA clásico: 1 bloque de 8×(20/10) = 4 min. Para más tiempo usa bloques de 4 min con recuperación entre bloques cuando cabe dentro de la duración solicitada; si no cabe, indica la duración real ajustada.
- TABATA evita movimientos técnicamente complejos o de carga pesada; restringe duración a 4–20 min.
- Se mantienen inventario, planificación oficial, clave `generador-wod-beta-v1`, WODs guardados, registro y copia de seguridad.
- La valoración de interferencias sigue siendo heurística; no garantiza individualización de cargas ni ausencia de fatiga.

### Prueba rápida

1. Exportar copia JSON desde Registro antes de actualizar.
2. Subir los nueve archivos a la raíz de GitHub y esperar despliegue.
3. Comprobar `v1.0.3 BETA`. Probar con DB, KB y comba, generación libre de EMOM 15', AMRAP 15' y TABATA 15'.
4. Verificar TABATA por bloques y que el tiempo de estaciones EMOM sea orientativamente 25–45 segundos.
5. Comprobar con modo avión, recuperación local de material y resultados anteriores.

**Importante:** los descansos interbloque de TABATA no se envían automáticamente al Contador WOD 2.2, que todavía se abre para configurarlo manualmente.


## Cambio v1.0.4 Beta — protección de WODs extra inteligentes

- Si hay dos sesiones oficiales exigentes alrededor de la fecha elegida (por ejemplo, miércoles y viernes con WOD extra el jueves), el generador **puede recomendar recuperación en lugar de generar un WOD**. Esta recomendación no se guarda como WOD ejecutado.
- Prioriza la sesión oficial posterior y considera sesiones anteriores, posteriores y resultados registrados en una ventana de hasta dos días.
- Filtra patrones que tengan carga cercana (empuje, overhead, bisagra, agarre y otros) y considera patrones secundarios de algunos ejercicios.
- Limita a tres rondas los FOR TIME inteligentes y modera sus repeticiones; si hay sesión oficial cercana, reduce a un máximo de 12 minutos el WOD extra y lo indica expresamente.
- Explica en el resultado los motivos y patrones protegidos. **No promete eliminar todas las interferencias ni sustituye la evaluación individual de fatiga**.
- El modo Libre y los cinco apartados ya existentes se mantienen. No se modifican la programación importada, los perfiles, los resultados ni la clave `generador-wod-beta-v1`. Se añade un campo opcional de recomendación a la estructura de estado.
- Actualiza la caché a `generador-wod-beta-cache-v1.0.4`, manteniendo los nueve archivos en la raíz.

### Pruebas recomendadas

1. Exporta una copia JSON antes de actualizar y cierra cualquier sesión en curso.
2. Después de subir los nueve archivos, abre la aplicación con conexión, cierra y abre de nuevo. Verifica `v1.0.4 BETA`.
3. Con la planificación ORIGIN importada, selecciona el 2026-11-19, Extra inteligente, FOR TIME, 15 minutos, intermedio: debe recomendar recuperación, **sin mostrar 5 rondas de KB Swing + Push-ups**.
4. Comprueba un día con una sola sesión oficial próxima, como el 2026-11-21: si propone un WOD, debe limitarlo y proteger patrones cargados; si no hay suficiente variedad segura, recomendar recuperación.
5. Prueba Generación Libre y comprueba que inventario, programación y registros anteriores siguen visibles.
6. Comprueba la apertura offline tras completar la actualización de los archivos.

**Limitación:** la asignación RPE 7 de los CSV es orientativa, no una medida real. El sistema no mide fatiga fisiológica ni lesiones y sólo evalúa la programación de CrossFit proporcionada.


## Cambio v1.0.5 Beta — confirmación de WOD extra con interferencias

- Cuando el modo **Extra inteligente** recomienda recuperación, muestra automáticamente un diálogo: «¿Seguro que quieres generar un WOD extra?». **No** conserva la recomendación sin generar entrenamiento; **Sí** genera una alternativa deliberadamente suave.
- La confirmación es por intento: no se guarda permiso para sesiones futuras. También se puede volver a abrir desde **Generar de todos modos**.
- La alternativa utiliza movimientos de bajo impacto y control postural/movilidad (sin necesidad de material), reduce la duración a 4–8 min según modalidad y fija RPE 2–4/10 como máximo. **No elimina el riesgo de interferencia**, sino que busca minimizarlo.
- El WOD generado se identifica como **WOD EXTRA CON PRECAUCIÓN**, se puede guardar, copiar y registrar como otros WODs.
- La recomendación de recuperación no es un resultado y no se guarda como WOD ejecutado. La generación libre no cambia.
- Mismo almacenamiento: `generador-wod-beta-v1`; los perfiles de material, programación y registros anteriores se mantienen.
- Antes de subir, exportar copia JSON. Instalar los nueve archivos, confirmar `v1.0.5 BETA` y probar el 19/11/2026 en modo inteligente, FOR TIME 15'.


## Cambio v1.0.6 Beta — estímulo útil con control de interferencias

- Cuando la planificación aconseje recuperación se mantiene el diálogo de confirmación.
- Al confirmar, se intenta generar un WOD de **10–12 minutos** (o bloques 20/10 hasta 14 minutos) con **RPE objetivo 5–6/10**, de forma orientativa; no se fuerza un entreno intenso.
- Se excluyen los movimientos con patrones principales/secundarios de fatiga reciente o próxima. Se limita la complejidad y volumen, pero se intenta obtener **trabajo medible**, no únicamente movilidad.
- Si sólo hay disponible core sin elevada fatiga, la aplicación indica *resistencia del core (objetivo adaptado)*, sin fingir que es un WOD mixto.
- Si no hay al menos dos movimientos adecuados, se rechaza la generación y se mantiene la recomendación de recuperación.
- Un WOD complementario no garantiza mejoras ni ausencia de interferencias: comprobar RPE real, técnica, descanso y rendimiento de la sesión oficial siguiente.
- El formato WhatsApp, los registros, el inventario, la programación CSV y el almacenamiento `generador-wod-beta-v1` permanecen.
- Antes de instalar, exportar copia JSON. No borrar el icono ni datos locales.
