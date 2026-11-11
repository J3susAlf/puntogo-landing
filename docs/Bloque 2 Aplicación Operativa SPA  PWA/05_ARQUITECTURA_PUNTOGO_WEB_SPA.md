# 05 - Arquitectura de `puntogo-web` (SPA / PWA React)

Este documento resume la arquitectura técnica de **`puntogo-web`**, la aplicación principal donde operan los negocios (POS, KDS, ERP, CRM y Tienda Online).

---

## 1. Stack Tecnológico Principal

| Tecnología | Versión / Librería | Propósito en PuntoGo |
| :--- | :--- | :--- |
| **React + Vite** | React 19 + Vite 6 | Renderizado SPA ultra rápido, Hot Module Replacement (HMR) y empaquetado optimizado para producción. |
| **React Router DOM** | `v7.x` | Enrutamiento declarativo, layouts anidados (`MainLayout`) y guardias de rutas (`ProtectedRoute`). |
| **Axios (`apiClient.js`)** | `v1.13.x` | Cliente HTTP centralizado con interceptores de JWT, inyección de `X-Branch-Id` y manejo global de errores `401`/`402`/`403`. |
| **Dexie.js (`offlineDb.js`)** | `v4.x` (IndexedDB) | Base de datos local en el navegador para **Modo Offline-First** (catálogo en caché y cola de órdenes sin internet). |
| **SignalR Client** | `@microsoft/signalr` | WebSockets en tiempo real para el KDS de Cocina (`/hubs/kitchen`), alertas de órdenes y notificaciones. |
| **PWA (`vite-plugin-pwa`)** | Workbox | Instalación como aplicación de escritorio/móvil y caché de assets estáticos (HTML, JS, CSS, fuentes). |
| **XLSX (`xlsx`)** | SheetJS | Importación y exportación masiva de productos, clientes, inventario y reportes en formato Excel. |

---

## 2. Estructura de Directorios (`puntogo-web/src/`)

```text
src/
├── api/
│   ├── apiConfig.js            # Selector dinámico de URL (Cloud vs Local LAN)
│   └── apiClient.js            # Instancia Axios + Interceptores JWT y X-Branch-Id
├── components/
│   ├── common/                 # ServerModeBadge, ServerConfigModal, OfflineBanner, NotificationBell
│   ├── customers/              # Modales de Estado de Cuenta y Promociones CRM
│   ├── dashboard/              # 11 pestañas administrativas (Reportes, Config, Seguridad, Mantenimiento)
│   ├── hr/                     # Pestañas de Empleados, Reloj Checador PIN, Documentos y Nómina
│   ├── inventory/              # Relaciones de recetas (BOM) y Conteo Físico por Categoría
│   ├── layout/                 # MainLayout.jsx y Sidebar.jsx dinámico
│   ├── orders/                 # Modales de CFDI 4.0, Devoluciones y Cancelación con autorización
│   └── public/                 # Componentes de Tienda Online (CartDrawer, ProductOptionsModal)
├── contexts/
│   └── AuthContext.jsx         # Estado global de sesión, usuario, sucursal activa, permisos y módulos
├── hooks/
│   ├── useBusinessModules.js   # Hook para consultar si un módulo o sub-switch está activo
│   └── useOnlineStatus.js      # Detector reactivo de conexión a Internet y estado de sincronización
├── offline/
│   ├── offlineDb.js            # Esquema IndexedDB con Dexie (products, categories, offlineOrdersQueue)
│   ├── catalogCacheService.js  # Descarga y lectura del catálogo en IndexedDB
│   └── offlineSyncService.js   # Sincronización automática de ventas offline al recuperar red
├── pages/                      # 17 vistas principales del sistema (POS, Caja, Órdenes, KDS, etc.)
├── routes/
│   ├── AppRoutes.jsx           # Árbol de rutas públicas y privadas
│   ├── ProtectedRoute.jsx      # Guardia de autenticación y rol por ruta
│   └── RoleGuard.jsx           # Guardia condicional para ocultar/mostrar elementos dentro de una vista
├── services/                   # Servicios API desacoplados por dominio (24 servicios)
└── utils/                      # Impresión térmica 58/80mm, cálculo m², formato de moneda y fechas
```

---

## 3. Selector Dinámico de Servidor (Nube vs. Local LAN)

Definido en `src/api/apiConfig.js` y controlado visualmente desde `ServerModeBadge.jsx` y `ServerConfigModal.jsx` en la pantalla de Login:

1. **Modo Nube (`cloud`):** Apunta a `https://api.puntogosolutions.site/api` (o `VITE_API_URL_CLOUD`). Ideal para administración multi-sucursal desde cualquier lugar.
2. **Modo Local / LAN (`local`):** Apunta a `http://localhost:5062/api` (o la IP de la PC Servidor en la red local del negocio, ej. `http://192.168.1.100:5062/api`).
3. **Cambio en Caliente (`setApiBaseUrl`):** Permite cambiar de servidor sin recompilar la aplicación y probar la latencia en milisegundos mediante el botón **"Probar Conexión"** (`/health` / `/Auth/system-status`).

---

## 4. Arquitectura Offline-First (IndexedDB + Sincronización)

Cuando el negocio pierde la conexión a Internet:
1. **`catalogCacheService.js`** sirve los productos, precios, categorías y grupos de opciones directamente desde las tablas `products` y `categories` de **IndexedDB** (`PuntoGoOfflineDB`).
2. En el Punto de Venta (`CashierPage.jsx`), si una venta en efectivo/tarjeta se cobra sin red, se almacena en la tabla local `offlineOrdersQueue` con un folio temporal (`OFF-XXXXXX`) y se imprime el ticket térmico normalmente.
3. En cuanto `useOnlineStatus.js` detecta el regreso de la red, **`offlineSyncService.js`** envía las órdenes pendientes al backend (`POST /api/Orders`), descuenta el inventario real y notifica al cajero mediante `OfflineStatusBanner.jsx`.

