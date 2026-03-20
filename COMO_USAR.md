# 📚 Guía Completa - Component Library

## 🚀 Inicio Rápido

### 1️⃣ Verificar Conexión Backend-Frontend

**Paso 1:** Asegúrate de tener ambos corriendo:

```bash
# Terminal 1 - Backend
cd backend
./mvnw spring-boot:run

# Terminal 2 - Frontend  
cd frontend
ng serve --proxy-config proxy.conf.json
```

**Paso 2:** Ve a la página de test:
```
http://localhost:4200/test
```

**Paso 3:** Haz clic en "Probar Conexión"
- ✅ Si funciona = Todo conectado correctamente
- ❌ Si falla = Revisa que el backend esté en puerto 8080

---

## ➕ Agregar Componentes

### Opción 1: Usando el Formulario Web

**URL:** `http://localhost:4200/add-component`

**Campos del formulario:**
1. **Nombre** - Nombre del componente (ej: "Floating Lines")
2. **Descripción** - Breve descripción del componente
3. **Categoría** - Selecciona HTML/CSS o TypeScript
4. **Código de Ejemplo** - Pega el código completo
5. **Tags** - Etiquetas separadas por comas (opcional)

**Flujo:**
1. Completa el formulario
2. Haz clic en "Crear Componente"
3. ✅ Verás mensaje de éxito
4. Automáticamente te redirige a `/components`
5. El componente se guarda en Supabase vía Spring Boot

### Opción 2: Usando la API directamente

```bash
curl -X POST http://localhost:8080/api/components \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Mi Componente",
    "descripcion": "Descripción del componente",
    "codigoEjemplo": "código aquí...",
    "categoria": {
      "id": "2024-01-01T00:00:00Z",
      "nombre": "HTML/CSS"
    },
    "tags": ["animation", "3d"]
  }'
```

---

## 👀 Ver Componentes

**URL:** `http://localhost:4200/components`

**Características:**
- Sidebar con lista de componentes por categoría
- Vista de código y preview
- Tabs para cambiar entre Preview y Code
- Botón para copiar código
- Responsive (drawer en móvil)

---

## 🔍 Verificar que los Datos se Guardan en Supabase

### Método 1: Desde el Frontend

1. Ve a `http://localhost:4200/test`
2. Haz clic en "Probar Conexión"
3. Te mostrará cuántos componentes hay

### Método 2: Desde Supabase Dashboard

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a "Table Editor"
4. Abre la tabla `components`
5. Verás todos los componentes guardados

### Método 3: Desde el Backend (Logs)

Revisa la consola del backend, verás logs como:
```
Hibernate: insert into components (nombre, descripcion, ...) values (?, ?, ...)
```

---

## 📊 Endpoints Disponibles

### Componentes
- `GET /api/components` - Listar todos
- `GET /api/components/{id}` - Obtener uno
- `POST /api/components` - Crear nuevo ✅
- `PUT /api/components/{id}` - Actualizar
- `DELETE /api/components/{id}` - Eliminar

### Categorías
- `GET /api/categorias` - Listar todas
- `POST /api/categorias` - Crear nueva

---

## 🎯 Flujo Completo de Uso

```
1. Usuario abre: http://localhost:4200/add-component
   ↓
2. Completa el formulario con datos del componente
   ↓
3. Hace clic en "Crear Componente"
   ↓
4. Frontend envía POST a: http://localhost:8080/api/components
   ↓
5. Spring Boot recibe la petición
   ↓
6. Spring Boot guarda en Supabase (PostgreSQL)
   ↓
7. Spring Boot devuelve el componente creado
   ↓
8. Frontend muestra mensaje de éxito
   ↓
9. Frontend recarga la lista de componentes
   ↓
10. Usuario es redirigido a /components
    ↓
11. Ve el nuevo componente en la lista
```

---

## ✅ Checklist de Verificación

Usa esta lista para verificar que todo funciona:

- [ ] Backend corriendo en puerto 8080
- [ ] Frontend corriendo en puerto 4200
- [ ] `/test` muestra conexión exitosa ✅
- [ ] `/test` muestra componentes existentes
- [ ] `/add-component` carga correctamente
- [ ] Formulario muestra categorías en el select
- [ ] Puedo crear un componente nuevo
- [ ] Veo mensaje de éxito después de crear
- [ ] Soy redirigido a `/components`
- [ ] El nuevo componente aparece en la lista
- [ ] Puedo ver el código del componente
- [ ] Los datos están en Supabase

---

## 🐛 Problemas Comunes

### "No se muestran categorías en el formulario"

**Causa:** El backend no está devolviendo categorías

**Solución:**
1. Ve a `/test` y haz clic en "Probar Categorías"
2. Si no hay categorías, créalas primero en Supabase
3. O usa este SQL en Supabase:
```sql
INSERT INTO categorias (id, nombre) VALUES 
  (NOW(), 'HTML/CSS'),
  (NOW(), 'TypeScript');
```

### "Error al crear componente"

**Causa:** Falta algún campo requerido o la categoría no existe

**Solución:**
1. Verifica que todos los campos con * estén llenos
2. Verifica que hayas seleccionado una categoría
3. Revisa la consola del navegador (F12) para ver el error exacto

### "No veo el componente después de crearlo"

**Causa:** El componente se creó pero la lista no se recargó

**Solución:**
1. Refresca la página manualmente (F5)
2. O ve a `/components` directamente

---

## 📝 Ejemplo Completo

### Crear un componente "Button Gradient"

1. Ve a: `http://localhost:4200/add-component`

2. Completa:
   - **Nombre:** Button Gradient
   - **Descripción:** Botón con gradiente animado al hacer hover
   - **Categoría:** HTML/CSS
   - **Código:**
   ```html
   <button class="gradient-btn">Click me</button>
   <style>
   .gradient-btn {
     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
     border: none;
     padding: 12px 24px;
     border-radius: 8px;
     color: white;
     cursor: pointer;
   }
   </style>
   ```
   - **Tags:** button, gradient, animation

3. Haz clic en "Crear Componente"

4. ✅ Verás el mensaje de éxito

5. Serás redirigido a `/components` donde verás tu nuevo botón

---

## 🎉 ¡Listo!

Ahora tienes todo funcionando:
- ✅ Backend conectado a Supabase
- ✅ Frontend conectado al backend
- ✅ Formulario para agregar componentes
- ✅ Vista para ver componentes
- ✅ Datos guardándose en Supabase

**Siguiente paso:** Empieza a agregar tus componentes favoritos! 🚀
