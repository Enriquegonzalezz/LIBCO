# 🎨 Renderizar Componentes Dinámicamente en Preview

## ¿Qué se implementó?

Se creó un sistema para renderizar componentes Angular dinámicamente en el preview:

1. **Componentes de Demostración** - Versiones renderizables de Input, Button, Radio, Card
2. **DynamicComponentService** - Servicio que mapea nombres a componentes
3. **ComponentsViewComponent** - Actualizado para renderizar dinámicamente
4. **Template** - Contenedor para inyectar componentes

---

## Archivos Creados

### Componentes de Demostración
```
frontend/src/app/components/dynamic-components/
├── input-demo.component.ts     - Input interactivo
├── button-demo.component.ts    - Button con eventos
├── radio-demo.component.ts     - Radio buttons
└── card-demo.component.ts      - Card estática
```

### Servicio
```
frontend/src/app/services/
└── dynamic-component.service.ts - Mapea componentes a demostraciones
```

### Cambios en ComponentsViewComponent
- ✅ Inyectado `DynamicComponentService`
- ✅ Inyectado `ViewContainerRef` para renderizar dinámicamente
- ✅ Método `renderDynamicComponent()` para crear instancias
- ✅ Effect para renderizar cuando se selecciona un componente Angular
- ✅ Template actualizado con contenedor `#dynamicComponentContainer`

---

## Cómo Funciona

### 1. Usuario selecciona un componente Angular
```typescript
selectComponent(component: ComponentModel) {
  this.selectedComponent.set(component);
  this.activeTab.set('preview');
}
```

### 2. Effect detecta cambio y renderiza
```typescript
effect(() => {
  if (this.isAngularComponent() && this.activeTab() === 'preview') {
    setTimeout(() => {
      this.renderDynamicComponent();
    }, 0);
  }
});
```

### 3. Servicio obtiene el componente de demostración
```typescript
const componentClass = this.dynamicComponentService.getComponentClass('Input');
// Retorna: InputDemoComponent
```

### 4. Componente se renderiza dinámicamente
```typescript
this.viewContainerRef.createComponent(componentClass);
```

---

## Resultado Esperado

### Cuando seleccionas "Input" (Angular)
```
┌─────────────────────────────────────┐
│ Preview                      Code   │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │ [Ingresa texto...        ]   │  │
│  │ Valor:                       │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Cuando seleccionas "Button" (Angular)
```
┌─────────────────────────────────────┐
│ Preview                      Code   │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │ [Primary Button]             │  │
│  │ [Secondary Button]           │  │
│  │ ✅ Primary button clicked!   │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Cuando seleccionas "Input" (Next.js)
```
┌─────────────────────────────────────┐
│                           Code       │
├─────────────────────────────────────┤
│                                     │
│  NEXT.JS Input                      │
│  [Copy]                             │
│                                     │
│  "use client";                      │
│  import { useState } from "react";  │
│  ...                                │
│                                     │
└─────────────────────────────────────┘
```

---

## Componentes Disponibles para Renderizar

| Componente | Framework | Renderizable | Demo |
|-----------|-----------|--------------|------|
| Input | Angular | ✅ Sí | InputDemoComponent |
| Button | Angular | ✅ Sí | ButtonDemoComponent |
| Radio | Angular | ✅ Sí | RadioDemoComponent |
| Card | Angular | ✅ Sí | CardDemoComponent |
| Input | Next.js | ❌ No | Solo código |
| Button | Next.js | ❌ No | Solo código |
| Card | Next.js | ❌ No | Solo código |
| Input | Vue | ❌ No | Solo código |
| Button | Vue | ❌ No | Solo código |
| Card | Vue | ❌ No | Solo código |
| Input | HTML/CSS | ❌ No | Solo código |
| Button | HTML/CSS | ❌ No | Solo código |
| Card | HTML/CSS | ❌ No | Solo código |

---

## Agregar Más Componentes

Para agregar un nuevo componente renderizable:

### 1. Crear componente de demostración
```typescript
// frontend/src/app/components/dynamic-components/my-component-demo.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component-demo',
  standalone: true,
  template: `<div>Mi componente</div>`,
  styles: [`div { padding: 20px; }`]
})
export class MyComponentDemoComponent {}
```

### 2. Registrar en DynamicComponentService
```typescript
private componentMap: Map<string, Type<any>> = new Map([
  ['Input', InputDemoComponent],
  ['Button', ButtonDemoComponent],
  ['Radio', RadioDemoComponent],
  ['Card', CardDemoComponent],
  ['MyComponent', MyComponentDemoComponent],  // ← Agregar aquí
]);
```

### 3. Listo
El componente se renderizará automáticamente cuando se seleccione.

---

## Pasos para Aplicar

### 1. Compilar Frontend
```bash
cd frontend
ng build
```

### 2. Reiniciar Frontend
```bash
ng serve --proxy-config proxy.conf.json
```

### 3. Verificar en Navegador
```
http://localhost:4200/components
```

1. Selecciona un componente Angular (Input, Button, Radio, Card)
2. Haz clic en la pestaña "Preview"
3. Deberías ver el componente renderizado

---

## Características de los Componentes Demo

### InputDemoComponent
- ✅ Input interactivo con two-way binding
- ✅ Muestra el valor en tiempo real
- ✅ Estilos con focus state

### ButtonDemoComponent
- ✅ Dos botones (Primary y Secondary)
- ✅ Eventos click que muestran mensajes
- ✅ Animaciones en hover

### RadioDemoComponent
- ✅ Radio buttons con opciones
- ✅ Two-way binding con ngModel
- ✅ Muestra la opción seleccionada

### CardDemoComponent
- ✅ Tarjeta con título y descripción
- ✅ Botón interactivo
- ✅ Estilos profesionales

---

## Troubleshooting

### El preview muestra vacío
1. Verifica que el componente está en `componentMap` del servicio
2. Abre DevTools (F12) → Console y busca errores
3. Verifica que el componente es standalone

### El componente no se renderiza
1. Verifica que `#dynamicComponentContainer` existe en el template
2. Verifica que `ViewContainerRef` está inyectado correctamente
3. Revisa los logs de la consola

### Estilos no se aplican
1. Los estilos están encapsulados en cada componente
2. Verifica que los estilos están en el `styles` del componente
3. No uses estilos globales, usa `styles` o `styleUrl`

---

## Próximos Pasos

1. ✅ Crear componentes de demostración
2. ✅ Crear servicio de mapeo
3. ✅ Actualizar ComponentsViewComponent
4. ⏭️ **Compilar y probar en navegador**
5. ⏭️ Agregar más componentes según sea necesario
6. ⏭️ Agregar syntax highlighting para código

---

## Resumen

El sistema está listo para renderizar componentes Angular dinámicamente en el preview. Cuando selecciones un componente Angular, verás:

- **Preview**: Componente renderizado e interactivo
- **Code**: Código fuente del componente

Para componentes Next.js/Vue/HTML, solo verás el código.

**Compila y prueba en el navegador ahora.**
