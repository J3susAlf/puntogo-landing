# 04 - Embudo Comercial, Calculadora de Precios y Prueba de 15 Días

Este documento describe la lógica comercial implementada en `puntogo-landing` para la presentación de planes SaaS, comparativa de características y conversión de prospectos (Leads).

---

## 1. Conmutador Dinámico de Precios (`initBillingToggle`)

Ubicado en la sección `#precios`, permite alternar entre **Pago Mensual** y **Pago Anual (Ahorra 20%)** mediante el switch `#billingSwitch`.

### Estructura de Planes Mostrada en el Frontend

| Plan | Precio Mensual | Precio Anual (Equiv. Mensual) | Total Anual Facturado | Público Objetivo |
| :--- | :---: | :---: | :---: | :--- |
| **Básico (Emprendedor)** | \$499 MXN/mes | **\$415 MXN/mes** | \$4,990 MXN/año | Cafeterías pequeñas, tiendas de abarrotes, 1 sucursal y hasta 3 usuarios. |
| **Pro Negocio (Más Popular)** | \$899 MXN/mes | **\$749 MXN/mes** | \$8,990 MXN/año | Restaurantes con KDS/Delivery, imprentas ($m^2$), refaccionarias, hasta 2 sucursales y 10 usuarios. |
| **Empresarial (Sin Límites)** | \$1,599 MXN/mes | **\$1,332 MXN/mes** | \$15,990 MXN/año | Cadenas, franquicias, multi-almacén, RRHH completo, auditorías y soporte VIP. |

### Actualización Dinámica de Enlaces WhatsApp (`.plan-cta-btn`)
Cada vez que el usuario cambia entre Mensual y Anual:
1. Se animan los montos (`.amount`) con un efecto `scale(1.08)`.
2. Se actualiza el texto de facturación (`.billing-period-text`).
3. **Se reescriben automáticamente los enlaces `href` de WhatsApp** de cada tarjeta para incluir el plan exacto y la modalidad seleccionada (Mensual o Anual con su precio correspondiente).

---

## 2. Filtro de Tabla Comparativa (`initPricingTableFilter`)

Para evitar que el usuario se abrume con más de 35 filas de características, la tabla comparativa incluye botones de filtro rápido (`.table-filter-btn`):
* `all`: Muestra todas las categorías.
* `core`: Límites de sucursales, usuarios, productos y modo Offline.
* `pos`: Funciones de caja, tickets térmicos, cotizaciones $m^2$ y cortes X/Z.
* `restaurante`: KDS Cocina, Delivery Rappi/DiDi y Tienda Online.
* `admin`: Inventario multi-almacén, compras, CRM, RRHH y CFDI 4.0.

---

## 3. Modal de Prueba Gratis por 15 Días (`initTrialRegisterModal`)

Al hacer clic en cualquier botón **"Probar 15 días gratis"** (`.open-trial-modal-btn`), se abre el modal `#trialRegisterModal` que consta de **2 pasos**:

### Paso 1: Captura del Prospecto (`#trialRegisterForm`)
Solicita los datos esenciales del negocio:
* Nombre completo (`#trialUserName`)
* Nombre del negocio (`#trialBizName`)
* Giro principal (`#trialBizType`: Restaurante, Abarrotes/Retail, Imprenta/Cotizaciones, Farmacia, etc.)
* Teléfono / WhatsApp a 10 dígitos (`#trialPhone`)
* Correo electrónico (`#trialEmail`)

### Paso 2: Generación de Clave Demo y Activación (`#trialStepSuccess`)
Al enviar el formulario:
1. **Generación de Licencia Temporal (`generateDemoKey`):**  
   Crea un código alfanumérico único con formato `DEMO-PG-2026-XXXX` (ej. `DEMO-PG-2026-8K4M`).
2. **Persistencia Local (`localStorage`):**  
   Guarda el objeto en `localStorage.setItem('puntogo_trial_lead', JSON.stringify(leadData))` con fecha de alta y expiración a 15 días.
3. **Integración Directa con WhatsApp (`#trialWhatsappBtn`):**  
   Construye un enlace hacia el número configurado en `window.PUNTOGO_SALES_PHONE` (`5215500000000` configurable en `js/main.js`) con un mensaje pre-llenado que incluye el nombre del cliente, negocio, giro, correo y su clave `DEMO-PG-2026-XXXX` para activación inmediata.
4. **Copiado en 1 Clic (`#copyLicenseBtn`):**  
   Permite copiar la clave al portapapeles (`navigator.clipboard.writeText`) con confirmación visual.

