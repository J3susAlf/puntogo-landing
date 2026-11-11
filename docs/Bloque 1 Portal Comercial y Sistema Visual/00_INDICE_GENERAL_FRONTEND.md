# 00 - Índice General de Documentación Frontend (PuntoGo)

Bienvenido a la documentación técnica oficial del **Ecosistema Frontend de PuntoGo**. Para mantener la información clara, resumida y fácil de consultar, la documentación se encuentra dividida en módulos secuenciales (`00_` al `08_`).

---

## Panorama del Ecosistema Frontend

El Frontend de PuntoGo se compone de dos repositorios/proyectos complementarios dentro del workspace:

1. **`puntogo-landing` (`puntogo-landing/`)**: Portal comercial de alta conversión y marketing interactivo (HTML5, CSS3, Vanilla JS) con simuladores en vivo del sistema POS/ERP, reproductores interactivos DOM a 60 FPS, calculadora de planes y generador de licencias de prueba por 15 días.
2. **`puntogo-web` (`puntogo-web/`)**: Aplicación Web Progresiva (SPA / PWA en React + Vite) que aloja el sistema operativo completo (POS, Caja, Inventario, KDS Cocina, Delivery, Cotizaciones $m^2$, CRM, RRHH, Facturación CFDI 4.0 y Tienda Online Pública `/tienda/:slug`) con soporte **Offline-First (IndexedDB/Dexie)** y tiempo real (**SignalR**).

---

## Estructura de Documentación (Orden de Lectura)

### Bloque 1: Portal Comercial y Sistema Visual (`puntogo-landing`)
* **[01_ARQUITECTURA_LANDING_PAGE.md](./01_ARQUITECTURA_LANDING_PAGE.md)**  
  Estructura de archivos (`index.html`, `css/styles.css`, `js/main.js`), secciones del sitio, SEO, metadatos OpenGraph y ejecución local (`npx serve`).
* **[02_MANUAL_IDENTIDAD_VISUAL_Y_COLORES.md](./02_MANUAL_IDENTIDAD_VISUAL_Y_COLORES.md)**  
  Filosofía de *Industrial Tactile Design*, paleta oficial de colores (`#0B2545`, `#0F4C81`, `#10B981`, `#F59E0B`), tipografía (`Plus Jakarta Sans` + `JetBrains Mono`) y botones táctiles 3D.
* **[03_SIMULADORES_Y_REPRODUCTORES_INTERACTIVOS.md](./03_SIMULADORES_Y_REPRODUCTORES_INTERACTIVOS.md)**  
  Arquitectura de los 6 simuladores en vivo del Hero, el selector interactivo de Giros/Módulos y los 2 reproductores tipo video en DOM (Delivery y Promociones WhatsApp/Email).
* **[04_EMBUDO_COMERCIAL_PRECIOS_Y_PRUEBA_15_DIAS.md](./04_EMBUDO_COMERCIAL_PRECIOS_Y_PRUEBA_15_DIAS.md)**  
  Conmutador de precios Mensual/Anual, filtros de tabla comparativa, enlaces dinámicos de WhatsApp y modal de registro de leads con generación de licencia demo (`DEMO-PG-2026-XXXX`).

### Bloque 2: Aplicación Operativa SPA / PWA (`puntogo-web`)
* **[05_ARQUITECTURA_PUNTOGO_WEB_SPA.md](./05_ARQUITECTURA_PUNTOGO_WEB_SPA.md)**  
  Stack tecnológico (React, Vite, Axios, Dexie.js, SignalR), estructura de carpetas `src/`, selector dinámico de servidor (Nube vs. Local LAN) y motor Offline-First.
* **[06_CONTROL_ACCESO_MODULOS_Y_ROLES_UI.md](./06_CONTROL_ACCESO_MODULOS_Y_ROLES_UI.md)**  
  Modelo de seguridad de 3 capas en el Frontend: Módulos de Negocio estilo Odoo (`useBusinessModules`), Roles (`ProtectedRoute`) y Permisos granulares / Sub-switches.
* **[07_MODULOS_OPERATIVOS_POS_CAJA_Y_CATALOGO.md](./07_MODULOS_OPERATIVOS_POS_CAJA_Y_CATALOGO.md)**  
  Resumen técnico de Punto de Venta (`CashierPage`), Turnos y Cortes X/Z (`CashShiftPage`), Historial/Devoluciones/CFDI (`OrdersPage`), Productos (`ProductsPage`), Inventario/Auditorías (`InventoryPage`), Almacenes (`WarehousesPage`) y Compras (`PurchasesPage`).
* **[08_MODULOS_CRM_RRHH_COCINA_Y_TIENDA_WEB.md](./08_MODULOS_CRM_RRHH_COCINA_Y_TIENDA_WEB.md)**  
  Resumen técnico de Cotizaciones Estándar y $m^2$ (`QuotesPage`), Clientes y Campañas (`CustomersPage`), Recursos Humanos y Nómina (`HumanResourcesPage`), Pantalla KDS (`KitchenPage`), Delivery (`DeliveryPage`), Tienda Online Pública (`/tienda/:slug`) y Dashboard Ejecutivo (`DashboardPage`).

---

> [!TIP]
> **Documentación específica de `puntogo-web`:** En la carpeta hermana `puntogo-web/docs/` también encontrarás las guías operativas y de despliegue en servidor (`00_INDICE_GENERAL_WEB.md` al `10_DESPLIEGUE_DOKPLOY_Y_HOSTINGER.md`).

