# ✅ Verificar Datos en Supabase

## Paso 1: Verifica que las tablas existen

Ve a Supabase Dashboard → SQL Editor y ejecuta:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Deberías ver:**
- `categorias`
- `componentes`

Si no ves estas tablas, necesitas crearlas primero.

---

## Paso 2: Verifica que hay datos en las tablas

```sql
SELECT COUNT(*) as total_categorias FROM categorias;
SELECT COUNT(*) as total_componentes FROM componentes;
```

**Deberías ver:**
- `total_categorias`: 5
- `total_componentes`: 7

Si ambos son 0, necesitas ejecutar el SQL de inserción.

---

## Paso 3: Verifica la estructura de las tablas

```sql
-- Ver estructura de categorias
\d categorias

-- Ver estructura de componentes
\d componentes
```

**Deberías ver:**
- `categorias`: id (TIMESTAMP), nombre (TEXT)
- `componentes`: id (TIMESTAMP), nombre (TEXT), descripcion (TEXT), codigo_ejemplo (TEXT), categoria_id (TIMESTAMP), fecha_creacion (TIMESTAMP)

---

## Paso 4: Si no hay datos, ejecuta este SQL

```sql
-- INSERTAR CATEGORÍAS
INSERT INTO categorias (id, nombre) VALUES 
  ('2024-01-01T00:00:00+00:00', 'HTML/CSS'),
  ('2024-01-02T00:00:00+00:00', 'TypeScript'),
  ('2024-01-03T00:00:00+00:00', 'JavaScript'),
  ('2024-01-04T00:00:00+00:00', 'React'),
  ('2024-01-05T00:00:00+00:00', 'Angular')
ON CONFLICT DO NOTHING;

-- INSERTAR COMPONENTES (primero 3)
INSERT INTO componentes (id, nombre, descripcion, codigo_ejemplo, categoria_id) VALUES 
  ('2024-01-10T10:00:00+00:00', 'Floating Lines', 'Animación de líneas flotantes con Three.js', 'import * as THREE from "three";\nconst scene = new THREE.Scene();', '2024-01-01T00:00:00+00:00'),
  ('2024-01-11T10:00:00+00:00', 'Gradient Button', 'Botón con gradiente animado', '<button class="btn">Click</button>', '2024-01-01T00:00:00+00:00'),
  ('2024-01-12T10:00:00+00:00', 'Card Component', 'Tarjeta reutilizable', '<div class="card"></div>', '2024-01-01T00:00:00+00:00')
ON CONFLICT DO NOTHING;
```

---

## Paso 5: Verifica que el backend puede leer los datos

Ejecuta en la terminal:

```bash
curl http://localhost:8080/api/components/test
```

**Deberías ver:**
```
"Components endpoint is working"
```

Si esto funciona, el problema está en la consulta de todos los componentes.

---

## Paso 6: Verifica los logs del backend

En la consola del backend, busca:
- `Fetching all components from database`
- `Found X components`
- O cualquier error

---

## Checklist

- [ ] Tablas `categorias` y `componentes` existen
- [ ] Hay 5 categorías en la tabla
- [ ] Hay al menos 3 componentes en la tabla
- [ ] Endpoint `/api/components/test` devuelve "working"
- [ ] Logs del backend muestran "Found X components"
- [ ] Frontend puede acceder a `/api/components` sin error 500
