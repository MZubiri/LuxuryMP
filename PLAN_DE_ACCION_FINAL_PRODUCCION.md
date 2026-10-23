# 📋 PLAN DE ACCIÓN FINAL — DESPLIEGUE A PRODUCCIÓN
## Luxury Machupicchu Peru — Haute Couture Andean Travel Platform

> **Documento Maestro de Implementación para Pase a Producción**  
> *Versión:* 1.0.0 — Octubre 2026  
> *Acreditaciones:* RUC: 20601622492 • GERCETUR • MINCETUR  
> *Infraestructura objetivo:* Coolify / Docker Compose / Ubuntu VPS  

---

## 🎯 Resumen Ejecutivo

Este plan de acción consolida de forma ordenada y priorizada todas las tareas técnicas, de seguridad, infraestructura, pasarela de pago y SEO indispensables para llevar la plataforma de **Luxury Machupicchu Peru** a un estado 100% operativo, seguro y de alto rendimiento en producción.

---

## 🚦 Matriz de Prioridades

| Nivel | Categoría | Impacto | Estado |
|---|---|---|:---:|
| **P0** | Seguridad Crítica | Vulnerabilidades de autenticación y exposición de datos | 🔴 Pendiente |
| **P0** | Pasarela Culqi Live | Procesamiento real de transacciones bancarias | 🔴 Pendiente |
| **P1** | Correo Transaccional (SMTP) | Entrega de vouchers a clientes y avisos al Concierge | 🟡 Pendiente |
| **P1** | Webhook Integrity | Protección contra falsificación de pagos | 🟡 Pendiente |
| **P1** | Hardening de Servidor | Restricción CORS y Swagger en Producción | 🟡 Pendiente |
| **P2** | Dominio & SEO | URLs canónicas, sitemap y metadatos de producción | 🟢 Preparado |
| **P2** | Automatización de Backups | Cron job diario de MySQL | 🟢 Preparado |
| **P3** | Analítica & Tracking | Google Analytics 4, Meta Pixel y conversiones | ⚪ Opcional |

---

## 📌 FASE 1: Seguridad Crítica & Autenticación (P0)

### 1.1 Remover Backdoor Maestro de Contraseña en el Backend
- **Archivo:** `backend/src/LuxuryMachupicchu.API/Controllers/AuthController.cs`
- **Diagnóstico:** Existen validaciones fijas para `"MachuPicchuLuxury2026!"` que permiten ingresar saltándose la verificación de hash de contraseñas.
- **Acción requerida:**
  1. En las líneas 61-63, eliminar `|| inputPass == "MachuPicchuLuxury2026!"`. La autenticación debe depender estrictamente de `PasswordHasher.VerifyPassword(inputPass, dbUser.PasswordHash)`.
  2. En el bloque de fallback (líneas 83-93), eliminar la contraseña fija por defecto y exigir que `AdminSettings:Password` provenga de variable de entorno no vacía.

### 1.2 Ocultar Credenciales de Demo y Botón de Autofill en la UI de Administración
- **Archivos:** `frontend/admin.html` y `frontend/admin.js`
- **Diagnóstico:** La pantalla de login muestra públicamente las credenciales en texto plano con un botón de autocompletado rápido.
- **Acción requerida:**
  1. En `frontend/admin.html` (líneas 45-51), eliminar el contenedor `<div class="login-demo-helper">` con las etiquetas `<code>admin</code>` y el botón `autofillDemoCredentials()`.
  2. En `frontend/admin.js`, eliminar la función `autofillDemoCredentials()`.

### 1.3 Clave Secreta de JWT Criptográficamente Fuerte
- **Archivo:** `docker-compose.yml` / Coolify Environment Variables
- **Diagnóstico:** El repositorio contiene una clave JWT de fallback pública.
- **Acción requerida:**
  - Asegurar que la variable `SERVICE_BASE64_JWT` o `JWT_SECRET_KEY` sea generada aleatoriamente con un mínimo de 64 caracteres en el panel de Coolify o en el archivo `.env` de producción del servidor.

---

## 💳 FASE 2: Pasarela de Pagos Culqi Live (P0 & P1)

### 2.1 Migración de Llaves de Prueba a Producción
- **Diagnóstico:** La plataforma opera con llaves `pk_test_...` y `sk_test_...`.
- **Acción requerida:**
  1. Obtener las credenciales definitivas en el panel de Culqi ([https://panel.culqi.com](https://panel.culqi.com)):
     - Llave Pública de Producción (`pk_live_...`)
     - Llave Secreta de Producción (`sk_live_...`)
  2. En el servidor de producción / Coolify, definir las variables de entorno:
     ```env
     CULQI_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxx
     CULQI_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
     ```
  3. En `frontend/checkout.js`, asegurar que la inicialización por defecto tome la llave entregada por `/api/payments/config` y no la de test.

### 2.2 Blindaje y Validación del Webhook de Pagos
- **Archivo:** `backend/src/LuxuryMachupicchu.API/Controllers/PaymentsController.cs` (`HandleWebhook`)
- **Diagnóstico:** `POST /api/payments/webhook` recibe cargas sin verificar la autenticidad del emisor.
- **Acción requerida:**
  1. Definir un token de webhook secreto en variables de entorno (ej. `CULQI_WEBHOOK_SECRET`).
  2. Validar que la petición provenga de Culqi verificando un token en la cabecera `Authorization` o un query parameter secreto configurado en el webhook de Culqi (ej. `https://tudominio.com/api/payments/webhook?token=SECRETO_HEX`).
  3. Registrar la URL definitiva en la consola de Culqi.

---

## 📧 FASE 3: Servidor de Correo Transaccional SMTP (P1)

### 3.1 Conexión SMTP para Vouchers y Notificaciones
- **Archivos:** `docker-compose.yml`, `backend/src/LuxuryMachupicchu.API/appsettings.Production.json`
- **Diagnóstico:** Actualmente no hay credenciales SMTP configuradas, por lo que `SmtpEmailService` opera en modo simulación y los correos se descartan.
- **Acción requerida:**
  1. Contratar o configurar un proveedor SMTP confiable (Google Workspace, Resend, Amazon SES, SendGrid o servidor propio).
  2. Inyectar en `docker-compose.yml` (sección `backend: environment`):
     ```yaml
     - SMTP_HOST=${SMTP_HOST:-smtp.resend.com}
     - SMTP_PORT=${SMTP_PORT:-587}
     - SMTP_USER=${SMTP_USER}
     - SMTP_PASSWORD=${SMTP_PASSWORD}
     - SMTP_FROM_EMAIL=${SMTP_FROM_EMAIL:-concierge@luxurymachupicchu.com}
     - SMTP_FROM_NAME=Luxury Machupicchu Peru Concierge Desk
     - SMTP_ENABLE_SSL=true
     - CONCIERGE_EMAIL=concierge@luxurymachupicchu.com
     ```
  3. Probar el envío de un voucher de prueba verificando que los correos no caigan en bandeja de SPAM (configurar registros SPF, DKIM y DMARC en el DNS del dominio).

### 3.2 Notificación por Email en Mensajes de Contacto
- **Archivo:** `backend/src/LuxuryMachupicchu.API/Controllers/ContactsController.cs`
- **Acción requerida:**
  - Inyectar `IEmailService` en `ContactsController` y disparar un correo automático al Concierge cada vez que un huésped complete el formulario general de contacto.

---

## 🛡️ FASE 4: Hardening de ASP.NET Core & Nginx (P1)

### 4.1 Restricción de CORS
- **Archivo:** `backend/src/LuxuryMachupicchu.API/Program.cs`
- **Acción requerida:**
  - Sustituir `policy.AllowAnyOrigin()` por una lista blanca explícita de dominios:
    ```csharp
    options.AddPolicy("ProductionCorsPolicy", policy =>
    {
        policy.WithOrigins(
            "https://luxurymachupicchu.com",
            "https://www.luxurymachupicchu.com",
            "https://lmptravel.com",
            "https://nuevo.lmptravel.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
    ```

### 4.2 Deshabilitar Swagger UI en Producción
- **Archivo:** `backend/src/LuxuryMachupicchu.API/Program.cs`
- **Acción requerida:**
  - Cambiar:
    ```csharp
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    ```
    para evitar que escáneres públicos analicen la superficie de endpoints.

---

## 🌐 FASE 5: Dominio, SEO & Páginas de Error (P2)

### 5.1 Reemplazo del Subdominio Temporal
- **Archivos afectados:**
  - `frontend/sitemap.xml`
  - `frontend/robots.txt`
  - `frontend/index.html` (canonicals, OpenGraph, JSON-LD)
  - `frontend/tour.html`
  - `frontend/checkout.html`
  - `frontend/tour.js`
- **Acción requerida:**
  - Una vez confirmado el dominio oficial (ej. `https://luxurymachupicchu.com` o `https://lmptravel.com`), realizar un reemplazo global de `https://nuevo.lmptravel.com` por el dominio canónico final.

### 5.2 Páginas de Error 404 Personalizadas
- **Archivo:** `frontend/nginx.conf`
- **Acción requerida:**
  - Configurar una página `404.html` con diseño oscuro y dorado de alta gama para que URLs inexistentes no devuelvan la página de error genérica de Nginx ni redirijan silenciosamente a la home sin informar al usuario.

---

## 💾 FASE 6: Base de Datos & Resiliencia (P2)

### 6.1 Automatización del Script de Backups
- **Archivo:** `scripts/backup-db.sh`
- **Acción requerida:**
  - Configurar una tarea programada en el crontab del servidor Linux:
    ```bash
    crontab -e
    # Ejecutar todos los días a las 03:00 AM UTC
    0 3 * * * /bin/bash /opt/LuxuryMP/scripts/backup-db.sh >> /var/log/luxurymp-backup.log 2>&1
    ```
  - Verificar que el directorio `backups/` se conserve fuera del contenedor y tenga retención de 14 días.

---

## 📊 FASE 7: Analítica & Medición de Conversión (P3)

### 7.1 Integración de Google Analytics 4 (GA4) & Meta Pixel
- **Archivos:** `frontend/index.html`, `frontend/tour.html`, `frontend/checkout.html`
- **Acción requerida:**
  1. Insertar el snippet de GA4 (`G-XXXXXXXXXX`) en el `<head>`.
  2. Emitir eventos personalizados de comercio electrónico:
     - `view_item`: al abrir `tour.html`.
     - `begin_checkout`: al abrir el modal de reserva o `checkout.html`.
     - `purchase`: al completarse el cobro en `checkout.js` tras la respuesta exitosa de Culqi.

---

## ✅ Checklist de Salida a Producción (Pre-Flight)

- [ ] Contraseña maestra fija `"MachuPicchuLuxury2026!"` eliminada del código C#.
- [ ] Cartel de usuario/contraseña y botón autofill eliminados de `admin.html`.
- [ ] Contraseña del usuario administrador cambiada a un valor único y privado.
- [ ] Clave JWT generada con 64+ caracteres criptográficos.
- [ ] Variables `CULQI_PUBLIC_KEY` y `CULQI_SECRET_KEY` configuradas con llaves `live`.
- [ ] Webhook URL de Culqi dada de alta en el panel oficial.
- [ ] Credenciales SMTP verificadas enviando un voucher de prueba.
- [ ] Swagger deshabilitado o restringido a entorno de desarrollo.
- [ ] Política CORS restringida al dominio de producción.
- [ ] URLs canónicas y sitemap actualizados con el dominio definitivo.
- [ ] Cron job de backup diario verificado en el servidor.
- [ ] Certificado SSL (HTTPS) emitido y renovándose automáticamente en Coolify / Traefik.
- [ ] Imagen principal de portada (`hero_machu_picchu.jpg`) limpia sin marca de agua (¡Completado!).

---
*Luxury Machupicchu Peru E.I.R.L. — Documentación Técnica Oficial de Despliegue*
