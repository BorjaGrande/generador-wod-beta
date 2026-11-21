# Generador WOD · 1.0.11 Beta — Selección y variedad de entrenamientos

Actualización incremental sobre **v1.0.10** para GitHub Pages/PWA de iPhone.

## Qué se ha corregido

- **Modalidad aleatoria con memoria local de las 12 últimas generaciones.** Se favorecen formatos menos utilizados recientemente; se prueba otro formato cuando el primero no encuentra un WOD compatible. Si sólo uno es viable, puede repetirse. La modalidad elegida explícitamente por el usuario se respeta.
- **Más estructuras de CrossFit:** se prueban circuitos con carrera/cardio, piernas, empuje, tracción, gimnasia y cargas dosificadas. No es obligatorio que cada entrenamiento incluya Sit-ups o comba.
- **Menos repeticiones de WODs anteriores:** se penalizan los mismos movimientos, especialmente para una misma fecha. La novedad nunca tiene prioridad sobre la compatibilidad.
- **Dosis mínima orientativa:** se rechazan estaciones cargadas cuya dosis resultaría testimonial; además se consideran los metros, calorías y segundos de manera distinta de las repeticiones.
- **Límites adicionales de volumen técnico:** movimientos olímpicos y gimnasia compleja tienen topes de repeticiones por sesión, aparte del presupuesto general de patrones.
- **AMRAP a ritmo productivo:** estimación de rondas con transiciones y pequeñas pausas, sin suponer una ronda adicional completa. Se indica el margen de 10–20 s por ronda en las instrucciones.
- **TABATA:** si no caben tres bloques dentro de las restricciones, el motor evalúa dos o uno e informa de la duración efectiva (14, 9 o 4 minutos según el caso).
- **FOR TIME en días de recuperación recomendada:** al confirmar la generación puede reducirse el CAP de 15 a 12 minutos, explicando el ajuste. Si no existe alternativa suficientemente productiva, informa de ello.
- **Riesgo estimado más contextual:** no se etiqueta automáticamente como moderada-alta una propuesta sólo por usar buena parte del presupuesto numérico.

## Se conserva de versiones anteriores

- **Catálogo de 122 movimientos** y requisitos de material, nivel técnico y habilidad establecidos en 1.0.10. Los filtros se comprueban antes de la selección.
- **Programación ORIGIN importada**, exactamente como fue cargada; el generador no sobrescribe los WODs oficiales.
- Perfiles de material, habilidades, resultados, WODs anteriores, recuperaciones, copias de seguridad JSON y controles de fatiga/molestias/RPE.
- La clave local `generador-wod-beta-v1`. El nuevo campo opcional `generationHistory` añade únicamente un registro compacto de las doce generaciones recientes y no requiere migración manual. Las copias antiguas siguen siendo legibles.
- Independencia de la aplicación Contador WOD.

## Instalación

1. En la app actual, pulsa **Registro → Exportar copia JSON** y guarda el archivo fuera de Safari.
2. Descomprime el ZIP de la versión 1.0.11 y sube **los diez archivos**, sin carpeta contenedora, a la raíz de `borjagrande/generador-wod-beta` en GitHub.
3. Usa *Commit changes*. Abre la misma URL con internet, cierra completamente la aplicación del iPhone y vuelve a abrirla.
4. Comprueba que aparece **v1.0.11 BETA**. No borres el icono ni los datos locales; no hace falta reimportar ORIGIN.
5. En Generar, selecciona **Extra inteligente · Modalidad aleatoria · 22/11/2026 · Avanzado/RX · 15 minutos · Fatiga media · Sin molestias · RPE 6–7**. Genera cuatro WODs seguidos y observa formatos, ejercicios y advertencias.

## Limitaciones y validación

Los presupuestos por patrón y el RPE objetivo siguen siendo **heurísticas**, no medidas fisiológicas ni garantías de ausencia de interferencia. La biblioteca de ejercicios no sustituye supervisión técnica. La aplicación no cambia el nivel de habilidad ni marca automáticamente equipo; un ejercicio sin cualquiera de sus requisitos sigue bloqueado.

Pruebas de la implementación: importación de 104 sesiones ORIGIN; matriz de niveles, formatos y estados de fatiga con aceptaciones/rechazos explícitos; comprobación de requisitos de barra/habilidad y conservación de datos; comprobación automatizada de la interfaz de generación, confirmación y persistencia de historial con navegador aislado. Sigue pendiente verificar la versión desplegada como PWA y su actualización de caché en un iPhone real.

**Nota:** un día especialmente cargado puede ofrecer menos opciones, o exigir recuperar, aunque el usuario seleccione Aleatoria. El generador no inventa estímulos intensos ni incrementa cargas sólo para asegurar cuatro modalidades diferentes.
