# 🚀 Guía de Deployment

## Estructura del Proyecto

```
backend (1)/
├── backend/          # Spring Boot API
├── frontend/         # Angular 20 App
├── .gitignore
├── DEPLOYMENT.md
└── README.md
```

---

## 📋 Requisitos Previos

- Git instalado
- Cuenta en GitHub
- Cuenta en Vercel (Frontend)
- Cuenta en Railway (Backend)
- Cuenta en Supabase (Base de datos)

---

## 🔧 Configuración Inicial en GitHub

### 1. Crear Repositorio en GitHub

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Component Library App"

# Agregar remote (reemplaza USER y REPO)
git remote add origin https://github.com/USER/REPO.git

# Push a main
git branch -M main
git push -u origin main
```

### 2. Estructura de Branches

```bash
# Main (producción)
git checkout -b main

# Develop (desarrollo)
git checkout -b develop

# Features (nuevas características)
git checkout -b feature/nombre-feature
```

---

## 🌐 Deployment Frontend (Vercel)

### 1. Conectar Vercel a GitHub

1. Ir a [vercel.com](https://vercel.com)
2. Sign in con GitHub
3. Click en "New Project"
4. Seleccionar el repositorio
5. Configurar:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend/browser`

### 2. Variables de Entorno en Vercel

En el dashboard de Vercel, agregar:

```
VITE_API_URL=https://tu-backend-railway.up.railway.app/api
```

### 3. Deploy Automático

- Cada push a `main` → Deploy automático a producción
- Cada push a `develop` → Deploy a preview

---

## 🚂 Deployment Backend (Railway)

### 1. Conectar Railway a GitHub

1. Ir a [railway.app](https://railway.app)
2. Sign in con GitHub
3. Click en "New Project"
4. Seleccionar "Deploy from GitHub repo"
5. Seleccionar el repositorio

### 2. Configurar Railway

1. Crear nuevo servicio: **PostgreSQL** (o usar Supabase)
2. Crear nuevo servicio: **Java App**
3. Configurar variables de entorno:

```
SPRING_DATASOURCE_URL=postgresql://user:password@host:5432/database
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_PROFILES_ACTIVE=prod
```

### 3. Configurar Build en Railway

```
Root Directory: backend
Build Command: mvn clean package -DskipTests
Start Command: java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### 4. Obtener URL del Backend

Railway genera automáticamente una URL pública:
```
https://tu-backend-railway.up.railway.app
```

---

## 🗄️ Base de Datos (Supabase)

### 1. Conexión desde Backend

En `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://db.supabasehost.com:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=TU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

### 2. Conexión desde Frontend

En `environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};

export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-railway.up.railway.app/api'
};
```

---

## 📦 Comandos Git Útiles

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Descripción del cambio"

# Push a rama actual
git push origin nombre-rama

# Pull cambios remotos
git pull origin nombre-rama

# Ver branches
git branch -a

# Cambiar de rama
git checkout nombre-rama

# Crear y cambiar a nueva rama
git checkout -b nombre-rama

# Eliminar rama local
git branch -d nombre-rama

# Eliminar rama remota
git push origin --delete nombre-rama
```

---

## 🔄 Workflow de Desarrollo

### 1. Crear Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad
```

### 2. Hacer Cambios

```bash
# Editar archivos...
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/nueva-funcionalidad
```

### 3. Pull Request

1. Ir a GitHub
2. Click en "New Pull Request"
3. Comparar `feature/nueva-funcionalidad` → `develop`
4. Crear PR y esperar revisión
5. Merge a `develop`

### 4. Release a Producción

```bash
git checkout main
git pull origin main
git merge develop
git push origin main
```

---

## ✅ Checklist de Deployment

- [ ] Código limpio y sin errores
- [ ] Todas las variables de entorno configuradas
- [ ] Base de datos migrada
- [ ] Frontend compilado sin errores
- [ ] Backend testado localmente
- [ ] CORS configurado correctamente
- [ ] URLs de API actualizadas
- [ ] Secrets seguros en Railway y Vercel
- [ ] Dominio personalizado (opcional)
- [ ] SSL/HTTPS habilitado

---

## 🆘 Troubleshooting

### Frontend no se conecta al Backend

```typescript
// Verificar en environment.ts que apiUrl sea correcto
console.log(environment.apiUrl);
```

### Backend rechaza peticiones CORS

```java
// Verificar CorsConfig.java
@CrossOrigin(origins = "https://tu-frontend-vercel.app")
```

### Base de datos no se conecta

```bash
# Verificar credenciales en application.properties
# Verificar que la BD está activa en Supabase
```

---

## 📞 Soporte

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Supabase Docs: https://supabase.com/docs
- Spring Boot Docs: https://spring.io/projects/spring-boot
