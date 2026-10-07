# Luxury Machupicchu Peru — Haute Couture Andean Travel Platform

> **Official Luxury Travel Platform & Curation System**  
> *RUC: 20601622492 • GERCETUR Certified • MINCETUR Authorized*

An ultra-luxury, high-performance web platform and RESTful Web API for bespoke journeys across Machu Picchu, the Sacred Valley, Lake Titicaca, Arequipa, and the Amazon Basin. Designed with a Belmond-inspired editorial aesthetic, bilingual support (EN/ES), multi-currency calculation (USD/PEN), interactive geographic elevation badges, and automated VIP concierge booking.

---

## 🏛️ Architectural Overview

- **Frontend:** Responsive, zero-dependency Vanilla HTML5/CSS3/JavaScript with luxury typography (*Cormorant Garamond*, *Montserrat*, *Inter*), micro-interactions, altitude & oxygen profiling, location cards, and WhatsApp VIP dispatch.
- **Backend:** Clean Architecture ASP.NET Core 9 Web API with Entity Framework Core (Pomelo MySQL), JWT authentication, rate limiting, and Swagger OpenAPI.
- **Database:** MySQL 8.0 with automatic migration, utf8mb4 collation, and automated seeding of luxury expeditions and locations.
- **Reverse Proxy / Server:** Nginx Alpine reverse proxy routing web requests and forwarding `/api/` traffic directly to the .NET 9 service.
- **Orchestration:** Multi-container `docker-compose.yml` pre-configured for local testing and production deployment on **Coolify**.

```
                [ Client Browser / HTTPS Domain ]
                                |
                                v
                [ Traefik / Reverse Proxy (Coolify) ]
                                |
                                v
               [ frontend Container (Nginx:80) ]
                     /                  \
             (Static Files)         (Proxy /api/)
                   |                     |
                   v                     v
          [ HTML/CSS/JS Assets ]   [ backend Container (ASP.NET Core 9:5000) ]
                                         |
                                         v
                                [ db Container (MySQL 8.0:3306) ]
```

---

## 🚀 Quick Deployment with Coolify

This repository is optimized for one-click deployment via **Coolify** using Docker Compose.

### 1. New Service in Coolify
1. In your Coolify dashboard, select your **Project** and click **+ New Service / Resource**.
2. Select **Docker Compose**.
3. Choose **GitHub Repository** and connect:
   `https://github.com/MZubiri/LuxuryMP`
   Branch: `main`
4. Set the **Compose File Location** to `./docker-compose.yml` (default).

### 2. Automatic Variable Generation (Magic Variables)
You **do not need to manually configure passwords or secret keys**. The `docker-compose.yml` uses Coolify's native **Magic Variables**:

- `${SERVICE_PASSWORD_ROOT}`: Coolify automatically generates and persists a cryptographically secure MySQL root password.
- `${SERVICE_USER_MYSQL}`: Coolify automatically generates the MySQL application username.
- `${SERVICE_PASSWORD_MYSQL}`: Coolify automatically generates the MySQL application password and shares it with the backend.
- `${SERVICE_PASSWORD_ADMIN}`: Coolify automatically generates the backoffice admin password.
- `${SERVICE_BASE64_JWT}`: Coolify automatically generates a secure 64-character base64 key for ASP.NET Core JWT authentication.

You can view the automatically generated credentials at any time in Coolify under **Configuration > Environment Variables**.

*(Optional)* If you wish to override agency contact info, you can set `WHATSAPP_NUMBER` or `AGENCY_EMAIL`.

### 3. Deploy
Click **Deploy** in Coolify.
- Coolify builds both the backend and frontend containers.
- The database starts with a healthcheck; once healthy, the backend initializes and seeds the initial catalog.
- Coolify's Traefik automatically assigns an SSL certificate to your configured domain pointing to port `80` (or `3000`).

---

## 💻 Local Development with Docker Compose

To test the full stack locally:

```bash
# Clone the repository
git clone https://github.com/MZubiri/LuxuryMP.git
cd LuxuryMP

# Create .env from template
cp .env.example .env

# Build and start all services
docker compose up --build -d

# Check running status
docker compose ps
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API & Swagger:** [http://localhost:3000/swagger](http://localhost:3000/swagger) or [http://localhost:5000/swagger](http://localhost:5000/swagger)
- **Database:** `localhost:3306` inside docker network

To stop the services:
```bash
docker compose down
```

---

## 📁 Repository Structure

```
LuxuryMP/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── LuxuryMachupicchu.sln
│   └── src/
│       ├── LuxuryMachupicchu.API/            # Controllers, JWT, Rate Limiting, Program.cs
│       ├── LuxuryMachupicchu.Domain/         # Entities, Enums, DTOs
│       └── LuxuryMachupicchu.Infrastructure/ # DbContext, Migrations, Seeding
├── frontend/
│   ├── assets/
│   │   └── images/                           # High-res location & train photography
│   ├── index.html                            # Main homepage
│   ├── tour.html                             # Tour detail page
│   ├── admin.html                            # Backoffice & Concierge Atelier portal
│   ├── styles.css                            # Haute couture design system & responsive rules
│   ├── admin.css                             # Administrative luxury design system & print styles
│   ├── app.js                                # Catalog rendering, currencies, reservation modal
│   ├── tour.js                               # Location badges, altitude profile, booking form
│   ├── admin.js                              # Administrative SPA logic, JWT auth, dashboard & bookings
│   ├── nginx.conf                            # Reverse proxy configuration
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml                        # Multi-service production stack
├── .env.example                              # Reference environment file
├── .dockerignore                             # Root docker ignore
├── .gitignore                                # Git ignore file
└── README.md                                 # Documentation & guide
```

---

## 🛡️ License & Legal

Operated by **Luxury Machupicchu Peru E.I.R.L.**  
Official Tourism Agency registered under Peruvian Law (MINCETUR / GERCETUR).  
All rights reserved © 2026.
