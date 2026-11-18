# Integración de Imágenes con Cloudinary CDN

> Este documento es un acceso directo. El archivo canónico y estructurado se encuentra en:
> [09_INTEGRACION_CLOUDINARY_IMAGENES_PRODUCTOS.md](file:///c:/Users/Alfredo%20Maga%C3%B1a/source/repos/PuntoGo-Proyect/puntogo-landing/docs/Bloque%202%20Aplicaci%C3%B3n%20Operativa%20SPA%20%20PWA/09_INTEGRACION_CLOUDINARY_IMAGENES_PRODUCTOS.md)

---

## Resumen Ejecutivo de la Conexión

* **Servicio:** Cloudinary CDN & Media Storage.
* **Cloud Name:** `tpwhw889`
* **Upload Preset:** `puntogo_products` (Modo *Unsigned* para subidas seguras desde el navegador sin exponer claves privadas).
* **Formatos soportados:** JPG, PNG, WebP (hasta 10 MB).
* **Almacenamiento en Base de Datos:** PostgreSQL tabla `"Products"`, columna `ImageUrl` (tipo `text`).
* **Optimización:** Transformación automática a WebP sobre la marcha para carga ultra-rápida en la Tienda Online (`/tienda/:slug`).

Para consultar el diagrama de arquitectura, el flujo de llamadas API y los componentes modificados, revisa el documento canónico en **Bloque 2**.
