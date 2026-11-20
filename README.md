# Generador WOD · v1.0.10 Beta — Biblioteca CrossFit + requisitos estrictos

**Actualización incremental sobre v1.0.9.** Extrae los **10 archivos** en la raíz del mismo repositorio GitHub Pages. La clave de almacenamiento local sigue siendo `generador-wod-beta-v1` y se mantiene la programación ORIGIN, perfiles, WODs y resultados anteriores. Haz copia JSON antes de actualizar.

## Cambios

- Catálogo curado a partir de [la biblioteca oficial de movimientos CrossFit](https://www.crossfit.com/crossfit-movements), con distinción explícita entre movimientos del índice y otros habituales en WOD oficiales (running, bicicletas, SkiErg).
- Biblioteca buscable en **MI MATERIAL**, fichas con resumen editorial de ejecución, requisitos físicos y técnicos y enlace a CrossFit. La mayoría redirigen al índice oficial; los enlaces individuales se ofrecen solo cuando se verificaron.
- **Para generar**, un ejercicio debe estar marcado como generable, quedar dentro del nivel, contar con **todos** los materiales seleccionados y **todas** las habilidades específicas habilitadas. Nunca se deduce saber Snatch por tener una barra, o por marcar el antiguo selector general `olympic`.
- Barra + discos + habilidad `Snatch con barra` para Power Snatch y variantes. Sin barra o sin habilidad, no aparece. GHD Sit-up exige GHD y su habilidad propia; Wall Ball exige balón + diana. Mancuernas y kettlebells no habilitan sus variantes técnicas entre sí.
- **No se generan** Reverse Crunch, Dead Bug, Hollow Hold, Mountain Climbers y accesorios similares: no se presentaban en el índice principal oficial. Los WODs antiguos que ya los contienen **no se reescriben ni se borran**.
- Movimientos avanzados meramente técnicos figuran como **Solo referencia** y se excluyen del generador.
- El sistema de presupuesto de fatiga de 1.0.9 y su configuración inicial (fatiga media / sin molestias / RPE 6–7) permanecen; no se promete predicción del RPE real.

## Instalación y validación

1. Exporta la copia JSON desde Registro de v1.0.9; guárdala fuera de la app.
2. Extrae y sube **10 archivos** (incluido el nuevo `catalog.mjs`) a la raíz de `generador-wod-beta` usando *Add file → Upload files*.
3. Haz commit y abre la URL instalada con conexión, cierra y reabre. Comprueba `v1.0.10 BETA`.
4. Comprueba en **Mi material** que las habilidades concretas están marcadas; el legado `olympic` no da permiso específico.
5. Prueba sin barra y con habilidad Snatch: nunca debe salir Snatch con barra. Prueba con barra, discos pero sin habilidad: tampoco. Con todos los requisitos y nivel avanzado, sí puede formar parte de la lista elegible.
6. Genera un Extra inteligente para 19, 20 y 22/11/2026. La programación ORIGIN se conserva localmente.

## Notas

Las descripciones son recordatorios breves originales y no sustituyen las demostraciones oficiales, la enseñanza técnica ni los estándares de competición. Los ejercicios históricos se conservan. Los perfiles están almacenados localmente y no se sincronizan entre Safari normal, navegación privada e icono de inicio. No borres los datos del sitio ni desinstales antes de exportar copia.
