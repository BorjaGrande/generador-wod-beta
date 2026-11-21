# Generador WOD · 1.0.13 Beta — Abrir contador configurado

Actualización sobre el motor 1.0.12, compatible con los datos y con la programación ORIGIN importada.

## Cambios

- El botón **«Copiar para WhatsApp»** pasa a **«Compartir WOD»**. Llama a `navigator.share({ title, text })` directamente desde el toque del usuario para abrir el menú nativo de compartir del iPhone/Android, con el texto completo ya preparado (líneas y marcado con asteriscos). Permite elegir WhatsApp, Mensajes, Mail y cualquier otra aplicación compatible instalada. No envía mensajes automáticamente. En avisos de recuperación se ofrece **«Compartir recomendación»**.
- Si el dispositivo o navegador no ofrece compartir nativo, el botón **copia el texto al portapapeles** y lo indica; si tampoco puede copiar, muestra el texto seleccionable manualmente. Cuando el usuario cancela el menú de compartir, no copia nada sin pedirlo.
- **Modalidad Aleatoria** compara resultados de cada formato viable antes de elegir; evita repetir el formato anterior si existen otros válidos y da preferencia a los menos utilizados recientemente. La modalidad elegida expresamente sigue respetándose.
- Penaliza adicionalmente los movimientos repetidos de las últimas generaciones, siempre que existan alternativas técnicamente y materialmente elegibles.
- Conserva las restricciones de equipo y habilidades del catálogo CrossFit, los límites de volumen por patrón, la confirmación de recuperación y la programación oficial.
- Incorpora el versionado de recursos y sincronización de caché de la 1.0.11.1.

## Instalación

1. En el iPhone, exportar copia **JSON** desde Registro antes de actualizar.
2. Descomprimir el ZIP y subir los **diez archivos de la raíz** a `borjagrande/generador-wod-beta`, reemplazando los anteriores, incluido `catalog.mjs`.
3. Antes, actualizar Contador WOD a v2.2.1 en su repositorio independiente. Confirmar **Commit changes** en el Generador. Abrir con internet el enlace de GitHub Pages desde Safari, cerrar la PWA y volver a abrir.
4. Comprobar **v1.0.13 BETA** y verificar la programación, perfiles de material e historial. **No borrar la app ni sus datos**.
5. Generar un WOD. Pulsar **Abrir contador WOD** para transferir modalidad y tiempos; **Compartir WOD** mantiene el menú nativo; **Guardar WOD** conserva el resultado para registro.

## Límites

- El menú nativo entrega el texto al destino seleccionado, pero **no garantiza una copia simultánea al portapapeles** (ni es necesaria para enviar). La opción de copiar queda disponible en el menú según el sistema. No se elige destinatario ni se envía automáticamente. La disponibilidad depende del navegador, permisos e instalación de apps; requiere HTTPS para Web Share API.
- El motor sigue siendo heurístico: no promete RPE real ni ausencia de interferencias. Un día muy cargado puede rechazar formatos o no ofrecer WOD extra.
- La conservación de datos depende de actualizar en el **mismo origen web y navegador/PWA**, sin borrar almacenamiento. La copia JSON es precaución imprescindible.
- No se incluyen datos personales ni las sesiones ORIGIN en el ZIP; permanecen guardados en local.


## Integración v1.0.13
- Orden de botones: **Abrir contador WOD** (verde), **Compartir WOD** y **Guardar WOD**.
- El enlace envía únicamente modalidad y tiempos; requiere Contador WOD v2.2.1 o posterior en `https://borjagrande.github.io/contador-wod/`.
- El reloj queda preparado, sin arrancar hasta pulsar INICIAR. Las PWAs son independientes; iOS puede abrir el contador en Safari.
- Se conservan las claves de almacenamiento y las sesiones ORIGIN locales.
