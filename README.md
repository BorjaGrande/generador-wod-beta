# Generador WOD · 1.0.3 Beta

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
