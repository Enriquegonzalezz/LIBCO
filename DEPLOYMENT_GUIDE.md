# 🚀 Guía de Deployment - Component Library

## 📋 Stack Tecnológico

### Backend
- **Framework:** Spring Boot 3.x
- **Base de datos:** PostgreSQL
- **Hosting:** Railway

### Frontend
- **Framework:** Angular 20
- **Hosting:** Vercel
- **Animaciones:** GSAP, Three.js

---

## 🔧 Configuración Local

### 1. Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

**Endpoints principales:**
- `GET /api/components` - Listar componentes
- `GET /api/categorias` - Listar categorías
- `POST /api/components` - Crear componente
- `PUT /api/components/{id}` - Actualizar componente
- `DELETE /api/components/{id}` - Eliminar componente

### 2. Frontend (Angular)

```bash
cd frontend
npm install
ng serve --proxy-config proxy.conf.json
```

El frontend estará disponible en: `http://localhost:4200`

---

## 🌐 Deployment en Producción

### Railway (Backend)

1. **Conectar repositorio:**
   - Ve a [Railway](https://railway.app)
   - Crea un nuevo proyecto
   - Conecta tu repositorio de GitHub
   - Selecciona la carpeta `backend`

2. **Configurar variables de entorno:**
   ```
   SPRING_DATASOURCE_URL=jdbc:postgresql://...
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=...
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   ```

3. **Copiar URL de deployment:**
   - Railway te dará una URL como: `https://your-app.railway.app`
   - Copia esta URL para el siguiente paso

### Vercel (Frontend)

1. **Actualizar configuración de producción:**
   
   Edita `frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-app.railway.app/api'  // URL de Railway
   };
   ```

2. **Actualizar CORS en Backend:**
   
   Edita `backend/src/main/java/.../config/WebConfig.java`:
   ```java
   .allowedOrigins(
       "http://localhost:4200",
       "https://your-vercel-app.vercel.app"  // Tu URL de Vercel
   )
   ```

3. **Desplegar en Vercel:**
   ```bash
   cd frontend
   npm install -g vercel
   vercel --prod
   ```

---

## 📁 Estructura de Archivos

```
backend/
├── src/main/java/
│   └── com/kike/componentlibrary/
│       ├── config/
│       │   └── WebConfig.java          # Configuración CORS
│       ├── controller/
│       ├── model/
│       ├── repository/
│       └── service/
└── pom.xml

frontend/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/                   # Página principal
│   │   │   └── components-view/        # Vista de componentes
│   │   ├── services/
│   │   │   └── component.service.ts    # Servicio API
│   │   └── models/
│   │       └── component.model.ts      # Modelos TypeScript
│   └── environments/
│       ├── environment.ts              # Config local
│       └── environment.prod.ts         # Config producción
├── proxy.conf.json                     # Proxy desarrollo
└── .env.example                        # Variables de entorno
```

---

## 🔐 Configuración CORS

El archivo `WebConfig.java` ya está configurado para permitir:
- ✅ Localhost (desarrollo)
- ✅ Vercel (producción)
- ✅ Métodos: GET, POST, PUT, DELETE, OPTIONS, PATCH
- ✅ Headers: Todos permitidos
- ✅ Credentials: Habilitados

---

## 🐛 Troubleshooting

### Error: CORS policy
**Solución:** Verifica que la URL de Vercel esté en `allowedOrigins` en `WebConfig.java`

### Error: Connection refused
**Solución:** 
- Backend: Verifica que esté corriendo en puerto 8080
- Frontend: Usa `ng serve --proxy-config proxy.conf.json`

### Error: 404 Not Found
**Solución:** Verifica que todos los endpoints usen el prefijo `/api`

---

## ✅ Checklist de Deployment

### Backend (Railway)
- [ ] Repositorio conectado a Railway
- [ ] Variables de entorno configuradas
- [ ] Base de datos PostgreSQL creada
- [ ] Deployment exitoso
- [ ] URL de Railway copiada

### Frontend (Vercel)
- [ ] `environment.prod.ts` actualizado con URL de Railway
- [ ] `WebConfig.java` actualizado con URL de Vercel
- [ ] Backend redespliegado con nuevo CORS
- [ ] Frontend desplegado en Vercel
- [ ] Pruebas de endpoints funcionando

---

## 🔄 Workflow de Desarrollo

1. **Desarrollo Local:**
   ```bash
   # Terminal 1 - Backend
   cd backend && ./mvnw spring-boot:run
   
   # Terminal 2 - Frontend
   cd frontend && ng serve --proxy-config proxy.conf.json
   ```

2. **Commit y Push:**
   ```bash
   git add .
   git commit -m "feat: nueva funcionalidad"
   git push origin main
   ```

3. **Deployment Automático:**
   - Railway detecta cambios en `backend/` y redespliega
   - Vercel detecta cambios en `frontend/` y redespliega

---

## 📊 Monitoreo

### Railway
- Logs: `railway logs`
- Métricas: Dashboard de Railway
- Base de datos: Railway PostgreSQL panel

### Vercel
- Logs: Vercel Dashboard
- Analytics: Vercel Analytics
- Performance: Vercel Speed Insights

---

## 🎯 URLs de Producción

Actualiza estas URLs después del deployment:

- **Backend (Railway):** `https://your-app.railway.app`
- **Frontend (Vercel):** `https://your-app.vercel.app`
- **API Docs:** `https://your-app.railway.app/swagger-ui.html` (si configurado)

---

## 📝 Notas Importantes

1. **CORS:** Siempre actualiza `WebConfig.java` con la URL de Vercel después del primer deployment
2. **Environment:** Usa `environment.ts` para local y `environment.prod.ts` para producción
3. **Proxy:** Solo usa `proxy.conf.json` en desarrollo local
4. **Variables:** Nunca commitees archivos `.env` con credenciales reales

---

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs en Railway/Vercel
2. Verifica la configuración CORS
3. Confirma que las URLs estén correctas
4. Prueba los endpoints con Postman/Thunder Client

---

**¡Listo para deployment! 🚀**
