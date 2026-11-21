# Generador WOD 1.0.14 Beta — Registro desde Contador

## Cambios

- El botón «Abrir contador WOD» incluye un identificador de WOD y una instantánea mínima en el fragmento de URL (no enviada al servidor).
- Al recibir una sesión finalizada del Contador, abre **Registro** y rellena resultado, fecha y tiempo medido; solicita RPE real obligatorio y permite indicar pesos, escalado y sensaciones.
- Mantiene los perfiles, habilidades, sesiones ORIGIN, WODs guardados e historial (clave `generador-wod-beta-v1`).
- Evita duplicar una ejecución del Contador mediante un identificador de sesión estable; no guarda el resultado automáticamente.
- Compatible con AMRAP, FOR TIME, EMOM y TABATA. El Contador mide tiempo, vueltas, intervalos marcados y repeticiones adicionales de AMRAP, no pesos ni RPE.
- Si iOS abre el Generador en otro contexto de almacenamiento, la instantánea enlaza el resultado con el WOD correspondiente sin alterar ORIGIN. La sincronización entre contextos de almacenamiento sigue siendo local y no automática.

## Instalación

Actualizar primero el Contador a 2.2.3 (nueve archivos) y después este Generador a 1.0.14 (diez archivos), en sus respectivos repositorios de GitHub Pages. Antes, exportar una copia JSON. Abrir con internet y comprobar las versiones. No borrar datos ni eliminar iconos.

## Prueba

Generar un FOR TIME desde el Generador, pulsar «Abrir contador WOD», iniciarlo y finalizarlo. Pulsar «Enviar resultado al Generador WOD». Debe aparecer la ficha de Registro con el resultado medido, RPE vacío y el botón «Guardar resultado».

### Limitaciones

La salida al Generador usa el enlace del repositorio publicado y puede abrirse en Safari y no en el icono PWA de iOS. El registro queda en el almacenamiento de la instancia del navegador que se abra. Si necesitas un único historial, verifica que el registro se ha guardado en el contexto que utilizas antes de borrar nada. No hay sincronización en la nube. Los resúmenes EMOM reflejan intervalos marcados, no una garantía de haber completado cada estación.
