# 🚀 Pasos para Actualizar Componentes por Framework

## Resumen de Cambios

Se han reorganizado los componentes por **framework** (Angular, Next.js, Vue, HTML/CSS) en lugar de por categoría. Ahora:

- ✅ Solo aparecen componentes de **UI**
- ✅ Agrupados por **framework**
- ✅ Angular: Muestra **Preview + Code**
- ✅ Next.js/Vue/HTML/CSS: Solo muestra **Code**
- ✅ Código con estilos mejorados

---

## Paso 1: Ejecutar SQL en Supabase

Ve a **Supabase Dashboard → SQL Editor** y ejecuta el contenido del archivo:

```
ACTUALIZAR_COMPONENTES_POR_FRAMEWORK.sql
```

Este script:
1. Agrega columnas `framework` e `is_ui_component` a la tabla `componentes`
2. Limpia datos existentes
3. Inserta nuevas categorías por framework
4. Inserta componentes UI de Angular, Next.js, Vue y HTML/CSS

---

## Paso 2: Verificar Datos en Supabase

Después de ejecutar el SQL, verifica en Supabase:

**Tabla `categorias`:**
```sql
SELECT * FROM categorias;
```

Deberías ver:
- Angular
- Next.js
- Vue
- HTML/CSS
- React

**Tabla `componentes`:**
```sql
SELECT nombre, framework, is_ui_component FROM componentes;
```

Deberías ver componentes como:
- Input (Angular)
- Button (Angular)
- Radio (Angular)
- Card (Angular)
- Input (Next.js)
- Button (Next.js)
- etc.

---

## Paso 3: Recompilar y Reiniciar Backend

```bash
cd backend
./mvnw clean compile
./mvnw spring-boot:run
```

---

## Paso 4: Recargar Frontend

En el navegador:
```
http://localhost:4200/components
```

Presiona `F5` para recargar.

---

## Resultado Esperado

### Sidebar (Izquierda)
```
⚙️ Angular (4)
  - Input
  - Button
  - Radio
  - Card

⚙️ Next.js (3)
  - Input
  - Button
  - Card

⚙️ Vue (3)
  - Input
  - Button
  - Card

⚙️ HTML/CSS (3)
  - Input
  - Button
  - Card
```

### Panel Derecho

**Si seleccionas un componente Angular:**
- Tabs: Preview + Code
- Preview muestra placeholder (para renderizar después)
- Code muestra el código TypeScript

**Si seleccionas un componente Next.js/Vue/HTML:**
- Tab: Code (solo código)
- Muestra el código con etiqueta de framework
- Botón para copiar código

---

## Checklist

- [ ] SQL ejecutado en Supabase
- [ ] Datos verificados en Supabase
- [ ] Backend recompilado
- [ ] Backend reiniciado
- [ ] Frontend recargado (F5)
- [ ] Sidebar muestra componentes por framework
- [ ] Al hacer clic, se muestra el panel derecho
- [ ] Angular muestra Preview + Code
- [ ] Next.js/Vue/HTML muestra solo Code

---

## Estructura de Datos Actualizada

### Component Model (TypeScript)
```typescript
interface Component {
  id: string;
  nombre: string;
  descripcion: string;
  codigoEjemplo: string;
  categoria: Categoria;
  framework?: 'Angular' | 'Next.js' | 'Vue' | 'HTML/CSS' | 'React';
  isUIComponent?: boolean;
  tags?: string[];
  autor?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Tabla `componentes` (Supabase)
```sql
CREATE TABLE componentes (
  id TIMESTAMP WITH TIME ZONE PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  codigo_ejemplo TEXT,
  categoria_id TIMESTAMP WITH TIME ZONE REFERENCES categorias(id),
  framework VARCHAR(50) DEFAULT 'Angular',
  is_ui_component BOOLEAN DEFAULT true,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Cambios en el Componente Angular

### ComponentsViewComponent.ts
- ✅ Nuevo computed `componentsByFramework` (agrupa por framework)
- ✅ Métodos `isAngularComponent()` y `isCodeOnlyComponent()`
- ✅ Método `getSelectedFramework()`

### ComponentsViewComponent.html
- ✅ Sidebar muestra frameworks en lugar de categorías
- ✅ Tab "Preview" solo aparece en componentes Angular
- ✅ Code view mejorado con etiqueta de framework

### ComponentsViewComponent.css
- ✅ Estilos mejorados para el código
- ✅ Badge de framework con colores
- ✅ Mejor legibilidad del código

---

## Próximos Pasos (Opcional)

1. **Agregar Syntax Highlighting** - Usar librería como `highlight.js`
2. **Renderizar Componentes Angular** - Usar `ComponentFactoryResolver`
3. **Agregar Más Componentes** - Extender la lista de componentes
4. **Agregar Tests** - Tests unitarios para el componente

---

## Soporte

Si algo no funciona:
1. Verifica los logs del backend (Ctrl+C y revisa errores)
2. Abre DevTools (F12) en el navegador y revisa la consola
3. Verifica que Supabase tiene los datos correctos
4. Recarga el navegador (F5)
