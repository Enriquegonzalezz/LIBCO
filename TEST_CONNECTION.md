# 🔌 Verificar Conexión Backend-Frontend

## ✅ Pasos para Verificar la Conexión

### 1. Verificar que el Backend esté corriendo

Abre una terminal y ejecuta:

```bash
cd backend
./mvnw spring-boot:run
```

**Deberías ver:**
```
Started BackendApplication in X.XXX seconds
Tomcat started on port(s): 8080 (http)
```

### 2. Verificar que el Frontend esté corriendo

Abre otra terminal y ejecuta:

```bash
cd frontend
ng serve --proxy-config proxy.conf.json
```

**Deberías ver:**
```
✔ Browser application bundle generation complete.
** Angular Live Development Server is listening on localhost:4200 **
```

### 3. Probar la Conexión

Abre tu navegador y ve a:

```
http://localhost:4200/test
```

Esta página te mostrará:
- ✅ Si la conexión es exitosa
- ❌ Si hay errores de conexión
- 📊 Cuántos componentes hay en la base de datos
- 📂 Cuántas categorías existen

### 4. Botones de Prueba

**Botón "Probar Conexión":**
- Hace una petición GET a `http://localhost:8080/api/components`
- Muestra todos los componentes de la base de datos
- Si funciona = ✅ Backend conectado correctamente

**Botón "Probar Categorías":**
- Hace una petición GET a `http://localhost:8080/api/categorias`
- Muestra todas las categorías
- Si funciona = ✅ Endpoint de categorías funcionando

## 🐛 Solución de Problemas

### Error: "Connection refused" o "ERR_CONNECTION_REFUSED"

**Causa:** El backend no está corriendo

**Solución:**
```bash
cd backend
./mvnw spring-boot:run
```

### Error: "CORS policy"

**Causa:** CORS no está configurado correctamente

**Solución:** Verifica que exista el archivo `backend/src/main/java/.../config/WebConfig.java`

### Error: "404 Not Found"

**Causa:** Los endpoints no coinciden

**Solución:** Verifica que:
- Backend use `/api/components` y `/api/categorias`
- Frontend use `environment.apiUrl = 'http://localhost:8080/api'`

## 📊 Endpoints Disponibles

### Componentes
- `GET /api/components` - Listar todos
- `GET /api/components/{id}` - Obtener uno
- `POST /api/components` - Crear nuevo
- `PUT /api/components/{id}` - Actualizar
- `DELETE /api/components/{id}` - Eliminar
- `GET /api/components/categoria/{nombre}` - Por categoría
- `GET /api/components/search?nombre={nombre}` - Buscar

### Categorías
- `GET /api/categorias` - Listar todas
- `GET /api/categorias/{id}` - Obtener una
- `POST /api/categorias` - Crear nueva
- `PUT /api/categorias/{id}` - Actualizar
- `DELETE /api/categorias/{id}` - Eliminar

## ✅ Checklist de Verificación

- [ ] Backend corriendo en puerto 8080
- [ ] Frontend corriendo en puerto 4200
- [ ] Página `/test` carga correctamente
- [ ] Botón "Probar Conexión" funciona
- [ ] Botón "Probar Categorías" funciona
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en la consola del backend

## 🎯 Siguiente Paso

Una vez que la conexión esté verificada, puedes:

1. **Ver componentes:** Ir a `http://localhost:4200/components`
2. **Agregar componentes:** Usar el formulario (próximo paso)
3. **Verificar en Supabase:** Los datos se guardan automáticamente

---

**Si todo funciona correctamente, verás ✅ en la página de test!**
