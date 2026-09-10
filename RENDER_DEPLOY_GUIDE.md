# Luna & Latte — Production Deployment Guide for Render (render.com)

This guide provides complete, step-by-step instructions for deploying the **Luna & Latte Café Platform** (Spring Boot 3 + React 18 / Vite + PostgreSQL) to [Render](https://render.com).

---

## 🏛 Architecture Overview

| Component | Service Type on Render | Tech Stack | Notes |
| :--- | :--- | :--- | :--- |
| **Database** | Managed PostgreSQL (`luna-and-latte-db`) | PostgreSQL 16 (Free Tier) | Injects dynamic `DATABASE_URL` |
| **Backend API** | Web Service (`luna-and-latte-api`) | Docker (Java 17 Temurin JRE) | Port dynamic `${PORT:8080}`, smart URL adapter |
| **Frontend UI** | Static Site (`luna-and-latte-web`) | React 18, Vite, Tailwind CSS | SPA rewrite rule `/* -> /index.html` |

---

## 🚀 Option 1: 1-Click Blueprint Deployment (Recommended)

Render Blueprints allow you to provision all 3 services automatically using the included `render.yaml` file.

### Steps:
1. **Push your repository to GitHub**:
   Ensure the root contains `render.yaml`, `Dockerfile`, `backend/`, and `frontend/`.

2. **Log into Render**:
   Navigate to [dashboard.render.com](https://dashboard.render.com) and click **New +** > **Blueprint**.

3. **Connect Your Repository**:
   Select your `web-` / `luna-and-latte` repository.

4. **Review & Apply**:
   - Render will read `render.yaml` and show:
     - 1 PostgreSQL database: `luna-and-latte-db`
     - 1 Web Service: `luna-and-latte-api` (Docker)
     - 1 Static Site: `luna-and-latte-web`
   - Click **Apply**.

5. **Automatic Wiring**:
   - The database will initialize first.
   - Render automatically attaches the database connection string to `DATABASE_URL` for the backend.
   - The backend builds via Docker multi-stage build.
   - The frontend builds via `npm install && npm run build` and automatically receives `VITE_API_BASE_URL`.

---

## 🛠 Option 2: Manual Dashboard Creation

If you prefer setting up each component manually through the Render dashboard:

### Step 1: Create Managed PostgreSQL Database
1. Go to **Dashboard** > **New +** > **PostgreSQL**.
2. Fill in the parameters:
   - **Name**: `luna-and-latte-db`
   - **Database**: `luna_latte_db`
   - **User**: `luna_latte_user`
   - **Region**: Same region as services (e.g. `Oregon (US West)`)
   - **Instance Type**: `Free`
3. Click **Create Database**.
4. Once provisioned, copy the **Internal Database URL** (for services inside Render) or **External Database URL**.

---

### Step 2: Deploy Spring Boot Backend (Web Service)
1. Go to **Dashboard** > **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Name**: `luna-and-latte-api`
   - **Region**: Same as database (e.g. `Oregon (US West)`)
   - **Branch**: `main`
   - **Runtime**: **Docker**
   - **Dockerfile Path**: `./Dockerfile` (or `backend/Dockerfile` if Root Directory is `backend`)
   - **Instance Type**: `Free`
4. Add **Environment Variables**:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `PORT` | `8080` | Render dynamic HTTP port |
   | `SPRING_PROFILES_ACTIVE` | `postgres` | Activates PostgreSQL configuration & smart URL adapter |
   | `DATABASE_URL` | *(Choose "Add from Database" or paste Internal DB URL)* | PostgreSQL connection string |
   | `JWT_SECRET` | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` | 256-bit secret key for HMAC-SHA256 |
   | `CORS_ALLOWED_ORIGINS` | `https://luna-and-latte-web.onrender.com` | Allowed frontend origin(s), comma-separated |
5. Click **Create Web Service**.
6. Note the deployed URL (e.g., `https://luna-and-latte-api.onrender.com`).

---

### Step 3: Deploy React Frontend (Static Site)
1. Go to **Dashboard** > **New +** > **Static Site**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Name**: `luna-and-latte-web`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add **Environment Variables**:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://luna-and-latte-api.onrender.com` | Deployed backend URL (automatically normalized to include `/api`) |
5. Add **Redirects / Rewrites** rule (Crucial for Single Page Application):
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## 🔑 Default Seed Accounts for Testing

Once deployed, the database automatically initializes with sample café data and demo accounts:

| Role | Email | Password | Tier / Privileges |
| :--- | :--- | :--- | :--- |
| **Patron** | `maya@nocturne.studio` | `password123` | Crescent Patron, 420 reward points |
| **Admin Roaster** | `admin@lunaandlatte.com` | `password123` | Administrator privileges |

---

## 🔍 Verification & Testing Checklist

- [ ] **Backend Health Check**:
  ```bash
  curl https://luna-and-latte-api.onrender.com/api/menu/featured
  ```
  Should return a JSON response with status `200` and featured coffee items.

- [ ] **Frontend Application**:
  Visit `https://luna-and-latte-web.onrender.com` in your browser. Verify that products, banners, and categories load from the backend.

- [ ] **Authentication Flow**:
  Click **Sign In** on the top navigation bar and log in using `maya@nocturne.studio` / `password123`. Verify successful JWT token issuance and patron dashboard display.

- [ ] **SPA Route Refresh**:
  Navigate to `/menu` or `/stores` and refresh the browser page (F5). The page should re-render smoothly without throwing a 404 error.

---

## 💡 Troubleshooting & Production Tips

1. **Free Tier Cold Starts**:
   Render's free tier spins down web services after 15 minutes of inactivity. The first request after spindown may take 30–50 seconds while the container initializes. Subsequent requests respond instantly.
2. **Database URL Format**:
   Render provides URLs starting with `postgres://` or `postgresql://`. The included `DatabaseConfig.java` automatically converts this into the standard JDBC format (`jdbc:postgresql://...`) and extracts the username and password dynamically.
3. **CORS Errors**:
   If browser console shows CORS blocked, ensure your backend's `CORS_ALLOWED_ORIGINS` environment variable includes your frontend domain, e.g.:
   `https://luna-and-latte-web.onrender.com`