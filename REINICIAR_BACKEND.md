# 🔄 Reiniciar Backend con Cambios

## Paso 1: Detén el backend actual

En la terminal donde corre el backend, presiona:
```
Ctrl + C
```

Espera a que se cierre completamente (verás "BUILD SUCCESS" o similar).

---

## Paso 2: Limpia y recompila

```bash
cd backend
./mvnw clean compile
```

Espera a que termine (deberías ver `BUILD SUCCESS`).

---

## Paso 3: Inicia el backend nuevamente

```bash
./mvnw spring-boot:run
```

Espera a que veas:
```
Tomcat started on port(s): 8080 (http)
```

---

## Paso 4: Prueba el endpoint de ping

En otra terminal, ejecuta:

```bash
curl http://localhost:8080/api/components/ping
```

**Deberías ver:**
```
pong
```

Si ves `pong`, el backend está corriendo correctamente.

---

## Paso 5: Prueba obtener componentes

```bash
curl http://localhost:8080/api/components
```

**Si funciona:** Verás un JSON con los 7 componentes
**Si falla:** Verás error 500, pero en la consola del backend verás el error exacto

---

## Paso 6: Revisa los logs del backend

En la consola del backend, busca:
- `=== INICIANDO CONSULTA DE COMPONENTES ===`
- `=== CONSULTA EXITOSA: X componentes ===`
- O `=== ERROR EN CONSULTA ===` seguido del error

---

## Checklist

- [ ] Backend detenido (Ctrl+C)
- [ ] Compilación exitosa (`BUILD SUCCESS`)
- [ ] Backend iniciado (`Tomcat started on port(s): 8080`)
- [ ] `/api/components/ping` devuelve `pong`
- [ ] `/api/components` devuelve datos o error con detalles en logs
