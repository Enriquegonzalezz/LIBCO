# 🔍 Diagnóstico del Error 500

## El problema
El backend devuelve error 500 al intentar obtener componentes desde `/api/components`.

## Pasos para diagnosticar

### 1. Verifica que el backend está corriendo
```bash
curl http://localhost:8080/api/diagnostic/health
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "Backend is running"
}
```

### 2. Verifica la conexión a Supabase
```bash
curl http://localhost:8080/api/diagnostic/db-connection
```

**Respuesta esperada:**
```json
{
  "status": "CONNECTED",
  "message": "Database connection successful",
  "database": "PostgreSQL"
}
```

Si ves `"status": "ERROR"`, el problema es la conexión a Supabase.

### 3. Revisa los logs del backend

En la terminal donde corre el backend, busca mensajes como:
- `Fetching all components from database`
- `Found X components`
- `Error fetching components:`

### 4. Verifica que las tablas existan en Supabase

Ve a Supabase Dashboard → SQL Editor y ejecuta:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

Deberías ver:
- `categorias`
- `componentes`

### 5. Verifica que hay datos en las tablas

```sql
SELECT COUNT(*) FROM categorias;
SELECT COUNT(*) FROM componentes;
```

Deberías ver al menos 5 categorías y 7 componentes.

## Posibles causas

| Error | Causa | Solución |
|-------|-------|----------|
| `FAILED` en db-connection | Credenciales incorrectas | Verifica `application.properties` |
| `0 components` | No hay datos | Ejecuta el SQL de inserción |
| `ERROR: relation "componentes" does not exist` | Tabla no existe | Crea las tablas en Supabase |
| `ERROR: column "codigo_ejemplo" does not exist` | Nombre de columna incorrecto | Verifica que sea `codigo_ejemplo` no `codigoEjemplo` |

## Checklist

- [ ] Backend corre sin errores de compilación
- [ ] Endpoint `/api/diagnostic/health` devuelve OK
- [ ] Endpoint `/api/diagnostic/db-connection` devuelve CONNECTED
- [ ] Tablas `categorias` y `componentes` existen en Supabase
- [ ] Hay datos en ambas tablas
- [ ] Logs del backend muestran "Found X components"
- [ ] Frontend puede acceder a `/api/components` sin error 500

## Próximos pasos

1. Ejecuta los comandos de diagnóstico arriba
2. Comparte los resultados
3. Verifica los logs del backend
4. Si todo está OK, reinicia backend y frontend
