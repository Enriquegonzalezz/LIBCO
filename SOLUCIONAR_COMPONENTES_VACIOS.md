# 🔧 Solucionar "No hay componentes disponibles"

## El Problema
El sidebar muestra "No hay componentes disponibles" aunque en `/test` se ven los componentes.

## La Causa
El endpoint `/api/categorias` no existía en el backend, por lo que:
1. El frontend intenta cargar categorías
2. Obtiene error 404
3. Sin categorías, el `computed componentsByCategory` devuelve array vacío
4. El sidebar muestra "No hay componentes disponibles"

## La Solución

### Paso 1: Detén el backend
En la terminal donde corre el backend, presiona:
```
Ctrl + C
```

### Paso 2: Recompila
```bash
cd backend
./mvnw clean compile
```

Deberías ver:
```
BUILD SUCCESS
```

### Paso 3: Reinicia el backend
```bash
./mvnw spring-boot:run
```

Espera a que veas:
```
Tomcat started on port(s): 8080 (http)
```

### Paso 4: Verifica que las categorías cargan
En otra terminal:
```bash
curl http://localhost:8080/api/categorias
```

**Deberías ver:**
```json
[
  {"id":"2024-01-01T00:00:00+00:00","nombre":"HTML/CSS"},
  {"id":"2024-01-02T00:00:00+00:00","nombre":"TypeScript"},
  ...
]
```

Si ves esto, ¡está funcionando!

### Paso 5: Verifica que los componentes cargan
```bash
curl http://localhost:8080/api/components
```

**Deberías ver:**
```json
[
  {"id":"2024-01-10T10:00:00+00:00","nombre":"Floating Lines",...},
  ...
]
```

### Paso 6: Recarga el frontend
En el navegador, ve a:
```
http://localhost:4200/components
```

Presiona `F5` para recargar.

**Ahora deberías ver:**
- ✅ Sidebar con categorías
- ✅ Componentes bajo cada categoría
- ✅ Al hacer clic, se muestra el panel derecho

---

## Checklist

- [ ] Backend detenido (Ctrl+C)
- [ ] Compilación exitosa (`BUILD SUCCESS`)
- [ ] Backend reiniciado (`Tomcat started on port(s): 8080`)
- [ ] `/api/categorias` devuelve JSON con categorías
- [ ] `/api/components` devuelve JSON con componentes
- [ ] Frontend recargado (F5)
- [ ] Sidebar muestra componentes
- [ ] Al hacer clic en componente, se muestra en panel derecho

---

## Si Aún No Funciona

### 1. Verifica los logs del backend
Busca en la consola del backend:
```
=== CARGANDO CATEGORÍAS ===
=== CATEGORÍAS CARGADAS: 5 ===
```

Si ves esto, las categorías se cargan correctamente.

### 2. Verifica la consola del navegador (F12)
Abre DevTools (F12) → Console y busca errores de red.

### 3. Verifica que Supabase tiene datos
En Supabase Dashboard → Table Editor:
- Tabla `categorias`: Debe tener 5 filas
- Tabla `componentes`: Debe tener 7 filas

Si no hay datos, ejecuta el SQL de inserción.

---

## Resumen

El problema era que faltaba el endpoint `/api/categorias`. Ahora:
- ✅ Backend tiene endpoint para categorías
- ✅ Frontend puede cargar categorías
- ✅ El `computed componentsByCategory` funciona
- ✅ Sidebar muestra componentes agrupados por categoría
