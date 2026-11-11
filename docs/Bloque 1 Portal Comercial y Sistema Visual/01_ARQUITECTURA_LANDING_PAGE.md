# 01 - Arquitectura de la Landing Page (`puntogo-landing`)

## 1. Propósito del Proyecto

`puntogo-landing` es el portal web comercial y de conversión de **PuntoGo**. Está diseñado sin dependencias pesadas de frameworks (100% HTML5 semántico, CSS3 moderno con variables nativas y Vanilla JavaScript ES6+) para garantizar:
* **Carga instantánea (Zero-Bundle Overhead)** y máxima puntuación en Core Web Vitals.
* **Demostración interactiva en vivo**: en lugar de videos pesados en MP4 que consumen ancho de banda, las demostraciones del POS, KDS, Delivery y Promociones son **simulaciones DOM animadas en tiempo real**.

---

## 2. Estructura de Archivos

```text
puntogo-landing/
├── index.html                  # Documento principal (Hero, Simuladores, Giros, Precios, Modales)
├── abrir-pagina.bat            # Script rápido para abrir la landing en entorno Windows
├── package.json                # Configuración de servidor local (npx serve -l 3000)
├── css/
│   └── styles.css              # Sistema de diseño, variables CSS, animaciones, layout responsivo
├── js/
│   └── main.js                 # Lógica de simuladores DOM, reproductores, precios y modales
└── docs/                       # Documentación técnica numerada (00_ a 08_)
```

---

## 3. Mapa de Secciones de `index.html`

| Sección / ID | Descripción Funcional |
| :--- | :--- |
| **Navbar (`#navbar`)** | Barra superior fija con efecto *glassmorphism* al hacer scroll, enlaces de navegación rápida y botón CTA para prueba gratis de 15 días. |
| **Hero & Mockup En Vivo (`#inicio`)** | Propuesta de valor principal, badges de confianza y un **Mockup Interactivo de 6 pestañas** con cursor automatizado que simula el uso real de PuntoGo. |
| **Selector de Giros y Módulos (`#modulos` / `#giros`)** | Configurador interactivo donde el visitante elige su giro (*POS Básico, Restaurante, Comercial/Servicios, Empresa Completa*) y activa/desactiva los 12 módulos viendo cómo cambia el menú lateral en tiempo real. |
| **Reproductor Interactivo Delivery (`#delivery-demo`)** | Reproductor estilo video con barra de progreso, capítulos y subtítulos que simula la llegada de pedidos de **Rappi / DiDi Food** y su pase automático a cocina. |
| **Reproductor Interactivo Promociones (`#promo-demo`)** | Reproductor estilo video que demuestra el envío masivo de campañas y cupones por **WhatsApp y Correo Electrónico** desde el CRM. |
| **Planes y Precios (`#precios`)** | Conmutador Mensual/Anual (20% de descuento), tarjetas de planes (*Básico, Pro Negocio, Empresarial*) y tabla comparativa filtrable por categoría. |
| **Preguntas Frecuentes (`#faq`)** | Acordeón interactivo (`initFaqAccordion`) resolviendo dudas de modo offline, timbrado CFDI 4.0, hardware compatible y migración de datos. |
| **Modal de Prueba Gratis (`#trialRegisterModal`)** | Formulario de captura de prospectos (Leads) que genera una clave de demostración única (`DEMO-PG-2026-XXXX`) y enlaza con ventas por WhatsApp. |

---

## 4. SEO y Metadatos

El archivo `index.html` incluye optimización técnica de buscadores y redes sociales:
* **Meta Tags Estándar:** `description`, `keywords`, `author`, `robots="index, follow"`, URL canónica (`https://puntogo.mx/`).
* **Open Graph / Facebook & Twitter Cards:** Títulos y descripciones comerciales listos para previsualización al compartir enlaces por WhatsApp o redes sociales.
* **Tipografías Optimizadas:** Preconexión (`rel="preconnect"`) a Google Fonts cargando `Plus Jakarta Sans` (UI/Titulares) y `JetBrains Mono` (precios, tickets, códigos y métricas).

---

## 5. Ejecución Local y Despliegue

### Desarrollo Local
```bash
# Opción 1: Mediante npm (puerto 3000)
npm start

# Opción 2: En Windows con doble clic
./abrir-pagina.bat
```

### Despliegue en Producción
Al ser un sitio estático puro (`index.html`, `css/`, `js/`), puede alojarse directamente en **Hostinger, Cloudflare Pages, Vercel, Netlify o Nginx/Dokploy** sin requerir paso de compilación (*build step*).

