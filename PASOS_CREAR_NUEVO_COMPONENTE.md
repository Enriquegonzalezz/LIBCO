# Guía: Crear Nuevo Componente

## Resumen del Flujo Implementado

El sistema ahora permite crear nuevos componentes a través de un modal en el dashboard. El flujo es:

1. **Frontend (Angular)**: Usuario completa formulario en modal
2. **Backend (Spring)**: Recibe datos y guarda en Supabase
3. **Dashboard**: Se actualiza automáticamente con el nuevo componente

---

## Pasos para Activar la Funcionalidad

### 1. Reiniciar Backend

```bash
# En la carpeta del backend
mvn clean install
mvn spring-boot:run
```

O si usas IDE:
- Detén la aplicación Spring Boot
- Ejecuta nuevamente

### 2. Recargar Frontend

```bash
# En la carpeta del frontend
ng serve
```

Luego recarga el navegador (F5)

---

## Usar la Funcionalidad

### Crear Nuevo Componente

1. **Abre el dashboard**: `http://localhost:4200/components`
2. **Haz clic en el botón "+"** en el header del sidebar (esquina superior derecha)
3. **Completa el formulario**:
   - **Nombre**: Nombre del componente (ej: Button, Input, Card)
   - **Descripción**: Qué hace el componente
   - **Framework**: Selecciona Angular, Next.js, Vue, React o HTML/CSS
   - **Código Ejemplo**: Pega el código del componente

4. **Haz clic en "Crear Componente"**
5. **Espera confirmación**: Verás un mensaje de éxito
6. **El nuevo componente aparecerá automáticamente** en el sidebar

---

## Estructura de Datos Enviada

El formulario envía esto al backend:

```json
{
  "nombre": "Button",
  "descripcion": "Un componente de botón reutilizable",
  "codigoEjemplo": "<button>Click me</button>",
  "framework": "Angular",
  "isUIComponent": true
}
```

---

## Campos en la Base de Datos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | TIMESTAMP | ID generado automáticamente |
| nombre | VARCHAR | Nombre del componente |
| descripcion | TEXT | Descripción del componente |
| codigo_ejemplo | TEXT | Código del componente |
| framework | VARCHAR | Framework (Angular, Next.js, Vue, React, HTML/CSS) |
| is_ui_component | BOOLEAN | Si es componente UI (default: true) |
| fecha_creacion | TIMESTAMP | Fecha de creación (automática) |
| categoria_id | UUID | ID de categoría (relación) |

---

## Validaciones

El formulario valida:
- ✅ Nombre es requerido
- ✅ Descripción es requerida
- ✅ Código Ejemplo es requerido
- ✅ Framework es requerido

Si falta algún campo requerido, verás un mensaje de error.

---

## Troubleshooting

### Error: "Error al crear el componente"

**Causa**: Probablemente el backend no está corriendo o hay un error en la BD.

**Solución**:
1. Verifica que el backend esté corriendo en `http://localhost:8080`
2. Revisa la consola del backend para ver el error exacto
3. Asegúrate de que la migración SQL se ejecutó correctamente

### El nuevo componente no aparece en el sidebar

**Causa**: El frontend no se recaró los componentes.

**Solución**:
1. Recarga la página (F5)
2. O cierra y abre el modal nuevamente

### Error de conexión a Supabase

**Causa**: Las credenciales de Supabase no están configuradas en Spring.

**Solución**:
1. Verifica `application.properties` o `application.yml`
2. Asegúrate de que las variables de entorno están configuradas:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`

---

## Próximos Pasos (Opcional)

- Agregar validaciones más estrictas en el backend
- Agregar categoría automática basada en framework
- Implementar edición de componentes existentes
- Agregar eliminación de componentes
- Agregar búsqueda y filtrado avanzado

---

## Archivos Modificados

### Frontend
- `components-view.component.ts`: Lógica del modal y formulario
- `components-view.component.html`: Modal y formulario HTML
- `components-view.component.css`: Estilos del modal y formulario
- `component.service.ts`: Método `createComponent()`
- `component.model.ts`: Agregado campo `tags` como string

### Backend
- `Component.java`: Agregados campos `tags` y `autor`
- `ComponentController.java`: Ya tiene endpoint POST (sin cambios)
- `ComponentService.java`: Ya tiene método `createComponent()` (sin cambios)

---

## Confirmación de Implementación

Después de completar los pasos, deberías poder:

1. ✅ Ver botón "+" en el sidebar
2. ✅ Hacer clic y abrir modal
3. ✅ Completar formulario
4. ✅ Crear componente
5. ✅ Ver nuevo componente en sidebar automáticamente
6. ✅ Seleccionar y ver detalles del nuevo componente

¡Listo! 🎉
