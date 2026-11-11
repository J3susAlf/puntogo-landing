# 08 - Módulos Especializados: Cotizaciones, CRM, RRHH, KDS, Tienda Web y Dashboard

Este documento completa el recorrido por las vistas especializadas y gerenciales de **`puntogo-web`**.

---

## 1. Cotizaciones Estándar y Dimensionales $m^2$ (`src/pages/QuotesPage.jsx`)

Diseñado tanto para comercios tradicionales como para **imprentas, vidrierías, carpinterías y herrerías**:
* **Cálculo Dimensional (`utils/dimensionUtils.js`):** Si el switch `quotesDimensionsEnabled` está activo, permite ingresar **Ancho (m) x Alto (m)** por partida, calcula el área en metros cuadrados ($m^2$) y multiplica por el precio por $m^2$ y la cantidad de piezas.
* **Conversión en 1 Clic:** Una cotización aprobada se puede enviar directo al Punto de Venta o convertirse en Orden de Venta descontando inventario.
* **Impresión Profesional (`utils/quotePrinter.js`):** Genera un formato de cotización formal en tamaño Carta / A4 listo para imprimir o guardar en PDF y enviar por WhatsApp.

---

## 2. Clientes CRM, Crédito y Promociones (`src/pages/CustomersPage.jsx`)

* **Directorio y Datos Fiscales:** Registro de clientes con historial de compras, precios preferenciales y datos para facturación CFDI 4.0.
* **Cuentas por Cobrar (`CustomerStatementModal.jsx`):** Control de límite de crédito, saldo pendiente, historial de cargos y registro de **Abonos de Clientes** con impresión de recibo de pago.
* **Campañas de Marketing (`CustomerPromotionModal.jsx`):** Envío de promociones, avisos y descuentos por **Correo Electrónico (SMTP)** o **WhatsApp** a clientes seleccionados o a toda la cartera.

---

## 3. Recursos Humanos y Nómina (`src/pages/HumanResourcesPage.jsx`)

Dividido en 4 pestañas operativas dentro de `src/components/hr/`:
1. **Directorio de Empleados (`EmployeesTab.jsx`):** Alta de personal, puesto, salario base, frecuencia de pago, fecha de ingreso y asignación de PIN de asistencia.
2. **Reloj Checador por PIN (`AttendanceTab.jsx`):** Kiosco táctil donde el empleado ingresa su PIN de 4 a 6 dígitos para registrar **Entrada, Salida a Comer, Regreso de Comer y Salida**, calculando retardos y horas trabajadas.
3. **Expediente Digital (`DocumentsTab.jsx`):** Carga y resguardo de documentos del empleado (INE, Contrato, CURP, Comprobante de domicilio, NSS).
4. **Cálculo y Pago de Nómina (`PayrollTab.jsx`):** Generación de periodos de nómina calculando percepciones, bonos, deducciones por faltas/retardos y emisión de recibos de pago.

---

## 4. Pantalla de Cocina KDS y Delivery (`KitchenPage.jsx` / `DeliveryPage.jsx`)

* **Kitchen Display System (`KitchenPage.jsx`):**
  * Conectado en tiempo real mediante **SignalR (`signalRService.js`)** al hub `/hubs/kitchen`.
  * Al cobrarse una orden en caja o recibirse de la tienda en línea / delivery, la comanda aparece instantáneamente con **alerta sonora** y un semáforo de tiempo (*Verde $\rightarrow$ Ámbar $\rightarrow$ Rojo*).
  * Permite marcar platillos individuales o la comanda completa como *En Preparación* y *Lista para Entregar*.
* **Integración Delivery (`DeliveryPage.jsx`):**
  * Concentrador de pedidos de plataformas externas (**Rappi / DiDi Food**) con panel de monitoreo de estados y simulador integrado para pruebas de recepción de webhooks.

---

## 5. Tienda en Línea Pública (`StoreSettingsPage.jsx` y `PublicStorePage.jsx`)

* **Configuración (`StoreSettingsPage.jsx`):** El administrador define el `slug` único de su tienda (ej. `/tienda/mi-restaurante`), colores de marca, banner, horarios de atención, costo de envío, pedido mínimo y métodos de entrega (*Recoger en Tienda* / *Envío a Domicilio*).
* **Portal Público (`src/pages/PublicStore/PublicStorePage.jsx`):**
  * Accesible sin iniciar sesión en `/tienda/:slug`.
  * Incluye buscador en tiempo real, filtro por categorías, selector de modificadores/extras (`ProductOptionsModal.jsx`), carrito deslizable (`CartDrawer.jsx`), seguimiento del estado del pedido en vivo y confirmación por WhatsApp.

---

## 6. Dashboard Ejecutivo y Configuración (`src/pages/DashboardPage.jsx`)

Compuesto por pestañas modulares en `src/components/dashboard/`:
* **Resumen y Finanzas (`DashboardOverviewTab` / `DashboardReportsTab`):** KPIs en tiempo real, utilidad bruta real (**Ventas - COGS / Costo de lo Vendido**), gráfica de ingresos vs. gastos, **Ranking ABC de Productos** y exportación a Excel.
* **Configuración Operativa:** Datos del Negocio y CSD SAT (`BusinessConfigTab`), Multi-Sucursales (`BranchConfigTab`), Métodos de Pago (`PaymentMethodsConfigTab`), Diseño de Ticket (`TicketConfigTab`) e Importación Masiva (`ImportConfigTab`).
* **Seguridad y Mantenimiento (`SecurityConfigTab` / `MaintenanceConfigTab`):** Sesiones activas con **Kill Switch** remoto, bitácora de auditoría, reinicio selectivo por empresa y reinicio global del servidor (SuperAdmin).

