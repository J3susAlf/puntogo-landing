# 07 - Módulos Operativos: POS, Caja, Órdenes, Catálogo e Inventario

Este documento resume el funcionamiento interno de las pantallas operativas centrales de **`puntogo-web`**.

---

## 1. Punto de Venta (`src/pages/cashier/CashierPage.jsx`)

Es el núcleo transaccional del sistema, diseñado para operar con teclado, lector de código de barras o pantalla táctil:
* **3 Niveles de Precio Dinámicos:** Permite vender a *Precio Público (Menudeo)*, *Precio Mayoreo* (se aplica automáticamente al alcanzar el mínimo de piezas configurado en el producto o manualmente) y *Precio Especial*.
* **Ventas en Espera (Held Sales):** Permite pausar una cuenta abierta (ej. cliente que olvidó su cartera o mesa abierta) y recuperarla después sin perder el carrito.
* **Carga de Cotizaciones:** Importa cualquier cotización vigente por su folio (`COT-XXXXX`) directamente al carrito de cobro.
* **Pagos Mixtos y Crédito:** Soporta cobro combinado en una misma venta (ej. parte en Efectivo, parte en Tarjeta, Transferencia o **Crédito de Cliente** validando su límite disponible).
* **Impresión Térmica (`utils/ticketPrinter.js`):** Genera tickets optimizados para impresoras de **58mm y 80mm** con logotipo del negocio, desglose de impuestos, código QR y pie de página personalizado.

---

## 2. Turnos de Caja y Cortes X/Z (`src/pages/CashShiftPage.jsx`)

* **Apertura de Turno:** Registra el fondo fijo inicial de caja asociado a la sucursal activa (`X-Branch-Id`).
* **Movimientos de Efectivo:** Registro de **Entradas** (cambio adicional) y **Salidas/Retiros** (pago a proveedores menores, gastos de tienda) con concepto obligatorio.
* **Corte Ciego (Blind Cut):** Si el switch `cashShiftBlindCutEnabled` está activo, el cajero debe declarar cuánto efectivo físico contó en el cajón **sin ver cuánto espera el sistema**, evitando ajustes fraudulentos. Al cerrar, el sistema calcula y guarda la diferencia (sobrante o faltante).

---

## 3. Historial de Órdenes, Devoluciones y CFDI 4.0 (`src/pages/OrdersPage.jsx`)

* **Consulta y Filtros:** Búsqueda por folio, rango de fechas, método de pago, cajero y estatus (`Pagada`, `Pendiente`, `Cancelada`, `Devuelta`).
* **Devoluciones Parciales y Totales (`OrderReturnModal.jsx`):** Permite seleccionar qué artículos y qué cantidades devuelve el cliente, reintegrando el stock automáticamente al almacén y ajustando el saldo o efectivo.
* **Facturación Electrónica CFDI 4.0 (`OrderInvoiceModal.jsx`):**
  * Captura o carga los datos fiscales del cliente (RFC, Razón Social, Régimen Fiscal SAT, Código Postal y Uso de CFDI).
  * Timbra la orden ante el PAC (Facturapi), permite **descargar el PDF y XML**, o enviarlos por correo electrónico en 1 clic.

---

## 4. Catálogo de Productos (`src/pages/ProductsPage.jsx`)

* **Gestión Integral:** Código de barras/SKU, categoría, costo de compra, 3 precios de venta, unidad de medida, claves SAT (`ClaveProdServ` y `ClaveUnidad`) e imagen.
* **Grupos de Opciones y Modificadores:** Configuración de extras obligatorios u opcionales (ej. *Tipo de leche, Término de carne, Ingredientes extra con costo adicional*).
* **Visibilidad Omnicanal:** Switch individual para publicar u ocultar cada producto en la **Tienda en Línea (`/tienda/:slug`)**.
* **Importación/Exportación Excel:** Carga masiva de catálogos mediante plantilla `.xlsx`.

---

## 5. Inventario, Recetas, Almacenes y Compras

### A. Inventario y Auditorías (`src/pages/InventoryPage.jsx`)
* **Kardex de Movimientos:** Historial inmutable de entradas, salidas, ajustes, mermas y ventas por sucursal/almacén.
* **Recetas / Explosión de Insumos (`ProductInventoryRelationsTab.jsx`):** Vincula un producto de venta (ej. *Hamburguesa* o *Lona Impresa*) con sus insumos de inventario (ej. *1 pieza de pan, 150g de carne*), descontando la materia prima automáticamente al vender.
* **Conteo Físico por Categoría (`CategoryPhysicalCountTab.jsx`):** Herramienta de auditoría para capturar existencias físicas, comparar contra el stock teórico, calcular el impacto financiero de las diferencias y aplicar el ajuste masivo.

### B. Almacenes y Proveedores (`src/pages/WarehousesPage.jsx`)
* Administración de múltiples bodegas por sucursal, **Transferencias Atómicas de Stock** entre almacenes y directorio de Proveedores con **Estado de Cuenta de Cuentas por Pagar (`SupplierStatementModal.jsx`)**.

### C. Órdenes de Compra (`src/pages/PurchasesPage.jsx`)
* Creación de órdenes de compra (`COM-00001`) a contado o crédito, y **Recepción de Mercancía (`PurchaseReceiveModal.jsx`)** que incrementa automáticamente el inventario y actualiza el costo promedio.

