# Configuración Backend - Frontend

## 📋 Descripción

Este documento explica cómo conectar el frontend Angular con el backend Spring Boot tanto en desarrollo local como en producción (Railway/Vercel).

## 🔧 Configuración Local

### 1. Backend (Spring Boot)
- El backend debe estar corriendo en `http://localhost:8080`
- Asegúrate de que Spring Boot tenga CORS configurado para permitir peticiones desde `http://localhost:4200`

### 2. Frontend (Angular)
- El frontend se conecta al backend usando la configuración en `src/environments/environment.ts`
- URL por defecto: `http://localhost:8080/api`

### 3. Ejecutar en Local

**Terminal 1 - Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
ng serve --proxy-config proxy.conf.json
```

La aplicación estará disponible en: `http://localhost:4200`

## 🚀 Configuración Producción

### Railway (Backend)
1. Despliega tu backend Spring Boot en Railway
2. Copia la URL de tu aplicación (ej: `https://your-app.railway.app`)

### Vercel (Frontend)
1. Actualiza `src/environments/environment.prod.ts` con la URL de Railway:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-app.railway.app/api'
};
```

2. Despliega en Vercel:
```bash
vercel --prod
```

## 📁 Archivos de Configuración

### `src/environments/environment.ts` (Local)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### `src/environments/environment.prod.ts` (Producción)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-railway-app.railway.app/api'
};
```

### `proxy.conf.json` (Proxy de desarrollo)
```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

## 🔐 CORS en Spring Boot

Asegúrate de tener configurado CORS en tu backend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:4200",
                    "https://your-vercel-app.vercel.app"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 📊 Endpoints del Backend

- `GET /api/components` - Obtener todos los componentes
- `GET /api/components/{id}` - Obtener un componente por ID
- `POST /api/components` - Crear nuevo componente
- `PUT /api/components/{id}` - Actualizar componente
- `DELETE /api/components/{id}` - Eliminar componente
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/components/categoria/{nombre}` - Componentes por categoría
- `GET /api/components/search?nombre={nombre}` - Buscar componentes

## 🐛 Troubleshooting

### Error: CORS policy
- Verifica que el backend tenga CORS configurado correctamente
- Asegúrate de que la URL del frontend esté en `allowedOrigins`

### Error: Connection refused
- Verifica que el backend esté corriendo en `http://localhost:8080`
- Verifica que el frontend use el proxy: `ng serve --proxy-config proxy.conf.json`

### Error: 404 Not Found
- Verifica que los endpoints del backend estén correctos
- Verifica que la URL base sea `/api` en ambos lados

## 📝 Variables de Entorno

### Local (.env.local)
```
API_URL=http://localhost:8080/api
```

### Producción (.env.production)
```
API_URL=https://your-railway-app.railway.app/api
```

## 🔄 Actualizar URL de Producción

Cuando despliegues el backend en Railway:

1. Copia la URL de Railway
2. Actualiza `src/environments/environment.prod.ts`
3. Actualiza `.env.production`
4. Redespliega el frontend en Vercel

## ✅ Checklist de Deployment

- [ ] Backend desplegado en Railway
- [ ] URL de Railway copiada
- [ ] `environment.prod.ts` actualizado
- [ ] CORS configurado en Spring Boot
- [ ] Frontend desplegado en Vercel
- [ ] Pruebas de endpoints funcionando
