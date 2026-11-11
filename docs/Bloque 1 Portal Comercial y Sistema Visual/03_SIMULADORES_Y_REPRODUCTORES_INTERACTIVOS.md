# 03 - Simuladores en Vivo y Reproductores Interactivos (`js/main.js`)

Una de las mayores fortalezas técnicas de `puntogo-landing` es que **no utiliza videos pregrabados estáticos**, sino motores de animación DOM programados en `js/main.js` que simulan el uso del sistema en tiempo real.

---

## 1. Simulador Multi-Módulo del Hero (`initMockupTabs`)

Ubicado en la sección principal (`#inicio`), presenta una ventana interactiva de PuntoGo con un **cursor virtual animado (`#simCursor`)** que se desplaza, hace clic (efecto ripple `.clicking`) y actualiza la interfaz automáticamente.

### Las 6 Simulaciones Automatizadas:
1. **Punto de Venta (`runPosSimulation`)**:
   * El cursor selecciona productos de la cuadrícula (`posProducts`), los agrega al ticket (`#simTicketItems`), recalcula subtotal, IVA (16%) y total en vivo, presiona el botón **Cobrar**, abre el modal de pago (`#simSuccessOverlay`), imprime el ticket térmico y limpia la orden para el siguiente ciclo.
2. **Cotizaciones $m^2$ (`runQuoteSimulation`)**:
   * Simula el flujo de imprentas/vidrierías: ingresa medidas de **Ancho x Alto** en metros, calcula el área en $m^2$, aplica precio unitario y ejecuta la conversión en 1 clic de *Cotización $\rightarrow$ Orden de Venta*.
3. **Cocina KDS (`runKdsSimulation`)**:
   * Muestra comandas llegando en tiempo real con semáforo de tiempo, marca platillos individuales como preparados y despacha la orden completa con alerta visual.
4. **Módulos estilo Odoo (`runModulesSimulation`)**:
   * El cursor activa y desactiva interruptores (switches) de módulos en el panel de configuración y muestra cómo aparecen o desaparecen del menú lateral instantáneamente.
5. **Delivery Apps (`runDeliverySimulation`)**:
   * Simula la recepción de un pedido entrante de **Rappi / DiDi Food**, su aceptación automática y el envío directo de la comanda al KDS de cocina.
6. **Tienda en Línea (`runTiendaSimulation`)**:
   * Simula la vista pública `/tienda/:slug` donde un cliente final agrega productos al carrito, elige opciones/modificadores y envía su pedido.

> [!NOTE]
> **Control de Ciclo (`simTimeout` / `activeSimTab`):** Cuando el usuario cambia manualmente de pestaña en el mockup, el temporizador anterior se limpia (`clearTimeout`) y arranca de inmediato la simulación de la pestaña seleccionada.

---

## 2. Configurador Interactivo de Giros y Módulos (`initGirosAndModules`)

Permite al prospecto comprobar la modularidad de PuntoGo antes de comprar:

* **4 Presets de Giro (`GIRO_PRESETS`):**
  * `basico`: Punto de Venta, Caja, Productos, Inventario, Clientes, Reportes.
  * `restaurante`: Básico + **Cocina (KDS)**, **Delivery**, **Tienda Online**.
  * `comercial`: Básico + **Cotizaciones ($m^2$)**, **Compras/Proveedores**, **Tienda Online**.
  * `completo`: Activa los **12 módulos** incluyendo **Recursos Humanos (RRHH)**.
* **Sincronización Bidireccional:**
  * Al hacer clic en un botón de giro (`.giro-btn`), todas las tarjetas de módulos (`.modulo-card`) y la vista previa de la barra lateral (`#sidebarPreviewList`) se actualizan con animaciones suaves.
  * Si el usuario prende o apaga un switch individualmente, el contador de módulos activos (`#activeModulesCount`) se recalcula al instante.

---

## 3. Reproductores Interactivos DOM a 60 FPS

En lugar de etiquetas `<video>` pesadas, la landing cuenta con **2 reproductores algorítmicos** con línea de tiempo (`0%` a `100%`), botón Play/Pause, salto por capítulos y subtítulos dinámicos:

### A. Reproductor de Delivery (`initDeliveryVideoPlayer`)
* **Duración del ciclo:** `18,000 ms` (18 segundos) actualizados vía `requestAnimationFrame`.
* **4 Escenas Sincronizadas:**
  1. **Escena 1 (0% - 25%):** El cliente pide desde su celular en Rappi / DiDi Food; el webhook llega a PuntoGo.
  2. **Escena 2 (25% - 50%):** La orden aparece en el panel de Delivery y se acepta sin recapturar precios.
  3. **Escena 3 (50% - 75%):** La comanda se proyecta automáticamente en el KDS de Cocina con temporizador.
  4. **Escena 4 (75% - 100%):** El platillo se marca como "Listo", notificando al repartidor e impactando caja e inventario.

### B. Reproductor de Promociones CRM (`initPromoVideoPlayer`)
* **Duración del ciclo:** `18,000 ms` (18 segundos) con bucle continuo y barra interactiva (`#promoTimeline`).
* **4 Escenas Sincronizadas:**
  1. **Escena 1 (0% - 25%):** Selección y segmentación de clientes frecuentes en el directorio CRM.
  2. **Escena 2 (25% - 50%):** Redacción de la campaña promocional con cupón de descuento e imagen.
  3. **Escena 3 (50% - 75%):** Disparo masivo simultáneo por **WhatsApp y Correo Electrónico (SMTP)**.
  4. **Escena 4 (75% - 100%):** Recepción del mensaje en el teléfono del cliente y métricas de retorno en el POS.

