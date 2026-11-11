# 02 - Manual de Identidad Visual y Sistema de Colores

Este documento define la identidad visual y la arquitectura cromática tanto de **`puntogo-landing`** como del sistema operativo **`puntogo-web`**, garantizando coherencia entre el portal de ventas y la aplicación real.

---

## 1. Filosofía de Diseño: *Industrial Tactile Design*

A diferencia de las páginas SaaS genéricas saturadas de degradados neón, PuntoGo utiliza una estética **Táctil Industrial y Financiera**:
* **Claridad Operativa:** Diseñado para que un cajero, mesero o gerente identifique botones de cobro, alertas de cocina y métricas en milisegundos.
* **Botones Sólidos con Relieve 3D:** Los botones de acción principal utilizan colores planos de alto contraste con bordes inferiores pronunciados (`border-bottom: 3px solid`) que simulan la respuesta física de una tecla registradora al presionarse (`transform: translateY(-2px)`).
* **Cero Degradados Artificiales en Botones:** La jerarquía se logra mediante contraste puro, sombras limpias y micro-interacciones.

---

## 2. Paleta Oficial de Colores (CSS Variables)

Definida en `:root` dentro de `css/styles.css`:

### A. Colores Primarios (Confianza, Banca y Tecnología)
| Variable CSS | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--primary-dark` | `#0B2545` | **Azul Obsidiana:** Fondos del Hero, barras laterales del POS, cabeceras oscuras y contenedores de alto contraste. |
| `--primary` | `#0F4C81` | **Azul Cobalto Profundo:** Botones primarios, encabezados destacados, iconos principales y enlaces activos. |
| `--primary-light` | `#1E6091` | **Azul Acero:** Estados `:hover`, bordes activos y acentos secundarios. |
| `--primary-glow` | `rgba(15, 76, 129, 0.12)` | Sombras suaves y halos de enfoque en inputs y tarjetas seleccionadas. |

### B. Acentos Semánticos (Conversión y Operación en Tiempo Real)
| Variable CSS | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--accent` | `#10B981` | **Verde Esmeralda "Go":** Botones de cobro, confirmación de ventas, estatus "En Línea", WhatsApp y éxito operativo. |
| `--accent-hover` | `#059669` | Estado `:hover` y borde táctil inferior de botones de conversión. |
| `--secondary` | `#F59E0B` | **Ámbar Cálido:** Alertas de Cocina (KDS), insignias "Más Popular", contadores de preparación y advertencias. |

### C. Superficies y Escala de Grises (Pizarras Limpias)
| Variable CSS | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--bg-main` | `#FFFFFF` | Fondo principal de secciones claras y tarjetas de módulos. |
| `--bg-alt` | `#F8FAFC` | **Gris Pizarra Ultra Claro:** Fondo alterno de secciones para separar bloques sin fatiga visual. |
| `--text-main` | `#0F172A` | **Pizarra Oscuro (Slate 900):** Títulos y texto principal de máxima legibilidad. |
| `--text-muted` | `#475569` | **Gris Medio (Slate 600):** Subtítulos, descripciones y textos explicativos. |
| `--border` | `#E2E8F0` | Líneas divisoras sutiles, bordes de tablas y tarjetas. |

---

## 3. Tipografía y Jerarquía

1. **`--font-sans` (`'Plus Jakarta Sans'`, sans-serif):**
   * Utilizada en titulares, botones, menús y párrafos.
   * Pesos: `400` (regular), `500` (medium), `600` (semibold), `700` (bold), `800` (extrabold para encabezados Hero).
2. **`--font-mono` (`'JetBrains Mono'`, monospace):**
   * Utilizada exclusivamente para **precios, totales de caja, folios de tickets, claves de licencia (`DEMO-PG-2026-XXXX`), cronómetros de cocina y métricas numéricas**.
   * Garantiza alineación tabular perfecta en cifras financieras.

---

## 4. Reglas de Contraste y Accesibilidad

* **Sobre fondos oscuros (`#0B2545`):** Texto primario en blanco puro (`#FFFFFF`), texto secundario en `#CBD5E1`, y acentos en Verde Esmeralda (`#10B981`) o Ámbar (`#F59E0B`).
* **Sobre fondos claros (`#FFFFFF` / `#F8FAFC`):** Texto primario en `#0F172A`, botones principales en `#0F4C81` con texto blanco, y bordes `#E2E8F0`.
* **Efecto Glassmorphism controlado:** Aplicado únicamente en la barra de navegación superior (`backdrop-filter: blur(16px)`) y cabeceras flotantes.

