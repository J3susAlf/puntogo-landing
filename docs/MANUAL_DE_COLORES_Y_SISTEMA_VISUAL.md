# 📘 Manual de Identidad Visual y Paleta de Colores Oficial
## **PuntoGo — El Punto de Venta y ERP Modular**

---

### 1. Filosofía de Identidad y Propósito

El sistema visual de **PuntoGo** fue concebido bajo dos pilares comerciales y operativos irremplazables:

1. **"Punto" (Precisión y Control):** 
   Representa el arqueo de caja exacto, la seguridad contable, el respaldo anti-pérdidas de inventario y la solvencia bancaria que todo comerciante necesita. Transmite seriedad institucional y robustez de grado de ingeniería.
2. **"Go" (Velocidad y Crecimiento):** 
   Representa la agilidad en mostrador (cobro en menos de 3 segundos), el dinamismo del negocio, la comanda en cocina que no se atrasa y la luz verde constante para generar ventas y utilidades.

#### 🚫 Por qué eliminamos los degradados genéricos en los botones:
La saturación de páginas web contemporáneas ha hecho que los degradados diagonales (`linear-gradient(azul a cian)`) se perciban como plantillas genéricas, artificiales o hechas sin criterio de negocio. 

**PuntoGo no es una app de entretenimiento: es la caja registradora y el motor financiero del negocio.**  
Por ello, el diseño adopta un **estilo táctil de alta precisión (Industrial Tactile Design)** con colores sólidos puros, bisel superior de micro-luz y bordes nítidos inspirados en hardware comercial de primer nivel (terminales de pago suizas, displays de ingeniería y software financiero institucional).

---

### 2. Paleta Cromática Oficial

```
+-------------------------------------------------------------------------------+
|  AZUL OBSIDIANA      AZUL COBALTO       VERDE ESMERALDA GO     ÁMBAR KDS      |
|     #0B2545            #0F4C81               #10B981            #F59E0B       |
| (Solidez / Caja)   (Operativa / ERP)     (Cobro Exitoso)    (Cocina / Alerta) |
+-------------------------------------------------------------------------------+
```

---

#### 🔵 2.1. Color Primario de Autoridad: **Azul Obsidiana PuntoGo**
Es el color insignia de la marca. Transmite confianza inquebrantable, seguridad bancaria y precisión de inventario.

- **Código HEX:** `#0B2545`
- **RGB:** `rgb(11, 37, 69)`
- **CMYK (Impresión / Folletería):** `C: 84% | M: 46% | Y: 0% | K: 73%`
- **HSL:** `hsl(213, 72%, 16%)`
- **Token CSS:** `var(--brand-punto)` / `var(--primary)`
- **Aplicación:**
  - Botones primarios de llamada a la acción (CTAs principales: *"Probar 15 Días Gratis"*).
  - Encabezados principales de presentaciones institucionales.
  - Insignia y contenedor principal del Logotipo PuntoGo.
  - Tarjetas de planes recomendados y barras de navegación corporativas.

---

#### 🔷 2.2. Color Secundario de Navegación: **Azul Cobalto Operativo**
Es el color de la usabilidad y la claridad del software. Guía la vista del cajero o administrador sin fatigarlo.

- **Código HEX:** `#0F4C81`
- **RGB:** `rgb(15, 76, 129)`
- **CMYK (Impresión):** `C: 88% | M: 41% | Y: 0% | K: 49%`
- **HSL:** `hsl(208, 79%, 28%)`
- **Token CSS:** `var(--brand-cobalt)` / `var(--secondary)`
- **Aplicación:**
  - Pestañas activas de módulos (Caja Mostrador, Cotizaciones, Reportes).
  - Subtítulos de sección y acentos de tablas comparativas.
  - Iconos de funciones activas en el dashboard del ERP.

---

#### 🟢 2.3. Color de Acento y Venta: **Verde Esmeralda Go**
Simboliza la liquidez, el cobro completado, el crecimiento del comercio y la confirmación positiva.

- **Código HEX:** 
  - Software & Dashboard: `#10B981` (Esmeralda puro)
  - Botón Acción Comercial / WhatsApp: `#16A34A` (Verde sólido de alta conversión)
- **RGB:** `rgb(16, 185, 129)` / `rgb(22, 163, 74)`
- **CMYK (Impresión):** `C: 86% | M: 0% | Y: 30% | K: 27%`
- **Token CSS:** `var(--brand-go)` / `var(--accent)`
- **Aplicación:**
  - Botón de cobro en caja registradora (`"Cobrar e Imprimir Ticket"`).
  - Indicador de conexión en tiempo real (`● Red Conectada`).
  - Badge de ahorro en planes anuales (`"Ahorras 2 Meses"`).
  - Botón de atención inmediata vía WhatsApp.

---

#### 🟠 2.4. Color Dinámico de Tiempos y Alertas: **Ámbar Cocina (KDS)**
Diseñado específicamente para tiempos de respuesta, pedidos pendientes y avisos preventivos sin generar alarma destructiva.

- **Código HEX:** `#F59E0B`
- **RGB:** `rgb(245, 158, 11)`
- **CMYK (Impresión):** `C: 0% | M: 35% | Y: 96% | K: 4%`
- **HSL:** `hsl(38, 92%, 50%)`
- **Token CSS:** `var(--brand-amber)` / `var(--warning)`
- **Aplicación:**
  - Monitor KDS de cocina para comandas en preparación.
  - Alerta de inventario por debajo del mínimo de reorden.
  - Cuentas por cobrar con vencimiento próximo.

---

#### ⚪ 2.5. Escala de Neutros y Soporte (Canvas de Lectura)
Garantiza legibilidad óptima bajo luz intensa en pantallas de mostrador y proyectores de presentaciones.

| Nombre del Color | HEX | Uso Recomendado |
| :--- | :--- | :--- |
| **Pizarra Oscuro** | `#0F172A` | Títulos `<h1>` a `<h3>`, cifras financieras principales. |
| **Carbón Texto** | `#334155` | Cuerpo de párrafos, descripciones de módulos. |
| **Gris Asfalto** | `#64748B` | Textos secundarios, timestamps, leyendas de inputs. |
| **Borde Pizarra** | `#CBD5E1` | Bordes de tarjetas, contorno de botones secundarios. |
| **Gris Nieve** | `#F1F5F9` | Fondos de inputs, cápsulas de filtros, barras inactivas. |
| **Superficie Pura**| `#FFFFFF` | Fondo de tarjetas, modales y tickets. |
| **Fondo Base** | `#F8FAFC` | Fondo general de la aplicación web y diapositivas claras. |

---

### 3. Especificación Técnica de los Nuevos Botones Distintivos (Sin Degradados)

Los botones de PuntoGo ahora utilizan una arquitectura **táctil sólida tridimensional sutil**:

```css
/* Botón Primario PuntoGo (Sólido, Táctil de Alta Autoridad) */
.btn-primary {
  background-color: #0b2545;
  color: #ffffff;
  border: 1px solid #163b66;
  border-radius: 14px;
  font-weight: 700;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2), /* Bisel de luz superior físico */
    0 3px 6px rgba(11, 37, 69, 0.16),       /* Sombra de apoyo */
    0 8px 18px rgba(11, 37, 69, 0.18);      /* Sombra ambiental */
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover: Elevación sutil sin perder el tono sólido */
.btn-primary:hover {
  background-color: #123762;
  border-color: #21548f;
  transform: translateY(-2px);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 6px 12px rgba(11, 37, 69, 0.22),
    0 14px 26px rgba(11, 37, 69, 0.25);
}

/* Active (Click): Sensación de pulsador mecánico real */
.btn-primary:active {
  background-color: #07192f;
  border-color: #0e2949;
  transform: translateY(1px);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}
```

---

### 4. Directrices para Presentaciones Ejecutivas y Pitch Decks

Al preparar diapositivas en PowerPoint, Keynote o Google Slides para vender PuntoGo a clientes o inversionistas:

1. **La Regla 60 - 30 - 10 de Color:**
   - **60% (Fondo / Canvas):** Blanco Nieve (`#F8FAFC`) o Blanco Puro (`#FFFFFF`) para presentaciones impresas y proyectadas. En presentaciones ejecutivas modo oscuro, usar `#09131F`.
   - **30% (Estructura y Texto):** Azul Obsidiana (`#0B2545`) en títulos principales y Pizarra Oscuro (`#0F172A`) en textos explicativos.
   - **10% (Acento de Impacto):** Verde Esmeralda (`#10B981`) para destacar el ROI, ahorro en dinero o cobros exitosos.
2. **Tipografía recomendada en presentaciones:**
   - **Titulares:** *Plus Jakarta Sans* (o *Inter* / *Montserrat* en peso Bold 800).
   - **Cuerpo:** *Plus Jakarta Sans* (o *Segoe UI* / *Roboto* en peso Regular 400).
3. **Imágenes de Interfaz:**
   - Enmarcar las capturas de pantalla de PuntoGo con esquinas redondeadas (`16px`) y una sutil sombra de elevación (`rgba(11, 37, 69, 0.12)`).
