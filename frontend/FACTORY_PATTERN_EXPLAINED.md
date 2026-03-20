# 🏭 Factory Pattern - Explicación Completa

## ¿Qué es el Factory Pattern?

El **Factory Pattern** es un patrón de diseño creacional que proporciona una interfaz para crear objetos sin especificar sus clases concretas. En lugar de usar `new` directamente, delegamos la creación de objetos a una "fábrica".

## 🎯 Problema que resuelve

Imagina que tienes que crear diferentes tipos de componentes (HTML/CSS, TypeScript, React, Vue, etc.). Sin el Factory Pattern:

```typescript
// ❌ Código repetitivo y difícil de mantener
if (type === 'HTML/CSS') {
  component = {
    nombre: template.nombre,
    descripcion: template.descripcion,
    codigoEjemplo: formatHtmlCss(template.codigoEjemplo),
    tags: [...template.tags, 'HTML', 'CSS']
  };
} else if (type === 'TypeScript') {
  component = {
    nombre: template.nombre,
    descripcion: template.descripcion,
    codigoEjemplo: formatTypeScript(template.codigoEjemplo),
    tags: [...template.tags, 'TypeScript', 'Angular']
  };
}
// ... más tipos
```

Con Factory Pattern:

```typescript
// ✅ Código limpio y extensible
const factory = factoryManager.getFactory(type);
const component = factory.createComponent(template, categoria);
```

## 🏗️ Estructura del Factory Pattern

### 1. Clase Abstracta (Base)

```typescript
export abstract class ComponentFactory {
  abstract createComponent(
    template: ComponentTemplate, 
    categoria: Categoria
  ): Partial<Component>;
}
```

### 2. Factories Concretas

```typescript
// Factory para componentes HTML/CSS
export class HtmlCssComponentFactory extends ComponentFactory {
  createComponent(template: ComponentTemplate, categoria: Categoria): Partial<Component> {
    return {
      nombre: template.nombre,
      descripcion: template.descripcion,
      codigoEjemplo: this.formatHtmlCssCode(template.codigoEjemplo),
      categoria: categoria,
      tags: [...template.tags, 'HTML', 'CSS'],
      autor: 'Usuario'
    };
  }

  private formatHtmlCssCode(code: string): string {
    if (!code.includes('<html>') && !code.includes('<!DOCTYPE')) {
      return `<!-- HTML -->\n${code}\n\n/* CSS */\n`;
    }
    return code;
  }
}

// Factory para componentes TypeScript
export class TypeScriptComponentFactory extends ComponentFactory {
  createComponent(template: ComponentTemplate, categoria: Categoria): Partial<Component> {
    return {
      nombre: template.nombre,
      descripcion: template.descripcion,
      codigoEjemplo: this.formatTypeScriptCode(template.codigoEjemplo),
      categoria: categoria,
      tags: [...template.tags, 'TypeScript', 'Angular'],
      autor: 'Usuario'
    };
  }

  private formatTypeScriptCode(code: string): string {
    if (!code.includes('import') && code.includes('@Component')) {
      return `import { Component } from '@angular/core';\n\n${code}`;
    }
    return code;
  }
}
```

### 3. Factory Manager

```typescript
export class ComponentFactoryManager {
  private factories: Map<string, ComponentFactory> = new Map();

  constructor() {
    // Registrar factories disponibles
    this.registerFactory('HTML/CSS', new HtmlCssComponentFactory());
    this.registerFactory('TypeScript', new TypeScriptComponentFactory());
  }

  registerFactory(type: string, factory: ComponentFactory): void {
    this.factories.set(type, factory);
  }

  createComponent(
    type: string,
    template: ComponentTemplate,
    categoria: Categoria
  ): Partial<Component> | null {
    const factory = this.factories.get(type);
    
    if (!factory) {
      console.error(`No factory found for type: ${type}`);
      return null;
    }

    return factory.createComponent(template, categoria);
  }

  getAvailableTypes(): string[] {
    return Array.from(this.factories.keys());
  }
}
```

## 💡 Uso del Factory Pattern

```typescript
// Crear el manager
const factoryManager = new ComponentFactoryManager();

// Crear un componente HTML/CSS
const htmlTemplate: ComponentTemplate = {
  nombre: 'Button Component',
  descripcion: 'Botón personalizado',
  codigoEjemplo: '<button class="btn">Click me</button>',
  tags: ['button', 'interactive']
};

const categoria: Categoria = {
  id: '1',
  nombre: 'HTML/CSS'
};

const component = factoryManager.createComponent('HTML/CSS', htmlTemplate, categoria);

console.log(component);
// {
//   nombre: 'Button Component',
//   descripcion: 'Botón personalizado',
//   codigoEjemplo: '<!-- HTML -->\n<button class="btn">Click me</button>\n\n/* CSS */\n',
//   categoria: { id: '1', nombre: 'HTML/CSS' },
//   tags: ['button', 'interactive', 'HTML', 'CSS'],
//   autor: 'Usuario'
// }
```

## ✅ Ventajas del Factory Pattern

### 1. **Separación de responsabilidades**
Cada factory se encarga de crear un tipo específico de componente.

### 2. **Extensibilidad**
Agregar un nuevo tipo de componente es fácil:

```typescript
// Crear nueva factory
export class ReactComponentFactory extends ComponentFactory {
  createComponent(template: ComponentTemplate, categoria: Categoria): Partial<Component> {
    return {
      nombre: template.nombre,
      descripcion: template.descripcion,
      codigoEjemplo: this.formatReactCode(template.codigoEjemplo),
      categoria: categoria,
      tags: [...template.tags, 'React', 'JSX'],
      autor: 'Usuario'
    };
  }

  private formatReactCode(code: string): string {
    if (!code.includes('import React')) {
      return `import React from 'react';\n\n${code}`;
    }
    return code;
  }
}

// Registrar en el manager
factoryManager.registerFactory('React', new ReactComponentFactory());
```

### 3. **Testabilidad**
Cada factory puede ser testeada independientemente.

```typescript
describe('HtmlCssComponentFactory', () => {
  it('should create HTML/CSS component with correct tags', () => {
    const factory = new HtmlCssComponentFactory();
    const component = factory.createComponent(template, categoria);
    
    expect(component.tags).toContain('HTML');
    expect(component.tags).toContain('CSS');
  });
});
```

### 4. **Mantenibilidad**
Cambios en la lógica de creación solo afectan a una factory específica.

### 5. **Código DRY (Don't Repeat Yourself)**
No duplicamos lógica de creación en múltiples lugares.

## 🎨 Plantillas Predefinidas

También incluimos plantillas predefinidas para componentes comunes:

```typescript
export const COMPONENT_TEMPLATES = {
  htmlCss: {
    button: {
      nombre: 'Button Component',
      descripcion: 'Botón personalizado con estilos modernos',
      codigoEjemplo: `<button class="custom-btn">
  Click me
</button>

<style>
.custom-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.custom-btn:hover {
  transform: translateY(-2px);
}
</style>`,
      tags: ['button', 'interactive']
    },
    card: {
      nombre: 'Card Component',
      descripcion: 'Tarjeta con diseño moderno',
      codigoEjemplo: `...`,
      tags: ['card', 'layout']
    }
  },
  typescript: {
    counter: {
      nombre: 'Counter Component',
      descripcion: 'Componente contador con Signals',
      codigoEjemplo: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <div class="counter">
      <button (click)="decrement()">-</button>
      <span>{{ count() }}</span>
      <button (click)="increment()">+</button>
    </div>
  \`
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }
}`,
      tags: ['counter', 'signals', 'interactive']
    }
  }
};
```

## 🚀 Uso con Plantillas

```typescript
const factoryManager = new ComponentFactoryManager();

// Usar plantilla predefinida
const buttonTemplate = COMPONENT_TEMPLATES.htmlCss.button;
const categoria = { id: '1', nombre: 'HTML/CSS' };

const buttonComponent = factoryManager.createComponent(
  'HTML/CSS',
  buttonTemplate,
  categoria
);

// Ahora puedes guardar el componente en el backend
componentService.createComponent(buttonComponent).subscribe(
  response => console.log('Component created:', response)
);
```

## 🆚 Factory Pattern vs Constructor directo

| Característica | Factory Pattern | Constructor directo |
|---------------|-----------------|---------------------|
| Flexibilidad | Alta | Baja |
| Extensibilidad | Fácil agregar tipos | Difícil |
| Mantenibilidad | Alta | Baja |
| Complejidad inicial | Media | Baja |
| Testabilidad | Alta | Media |

## 📝 Conclusión

El Factory Pattern en nuestra aplicación nos permite:

- ✅ Crear diferentes tipos de componentes de manera consistente
- ✅ Agregar nuevos tipos fácilmente (React, Vue, Svelte, etc.)
- ✅ Mantener el código organizado y limpio
- ✅ Formatear el código según el tipo de componente
- ✅ Agregar tags automáticamente según el tipo
- ✅ Testear cada factory independientemente

**Factory Pattern + TypeScript = Código escalable y type-safe! 🏭**
