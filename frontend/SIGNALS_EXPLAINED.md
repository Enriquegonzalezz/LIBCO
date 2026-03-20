# 🔥 Angular Signals - Explicación Completa

## ¿Qué son los Signals?

**Signals** son una nueva forma de manejar el estado reactivo en Angular 20. Son primitivas reactivas que notifican automáticamente a Angular cuando su valor cambia.

## 📊 Ventajas de Signals

1. **Rendimiento mejorado** - Solo se actualizan las partes del DOM que realmente cambiaron
2. **Código más simple** - No necesitas `async` pipe ni subscripciones manuales
3. **Type-safe** - TypeScript sabe exactamente qué tipo de dato contiene cada signal
4. **Granularidad fina** - Actualizaciones más precisas y eficientes

## 🎯 Tipos de Signals

### 1. Signal básico
```typescript
import { signal } from '@angular/core';

// Crear un signal
const count = signal(0);

// Leer el valor (siempre con paréntesis)
console.log(count()); // 0

// Actualizar el valor
count.set(5); // Establece un nuevo valor
count.update(v => v + 1); // Actualiza basándose en el valor anterior
```

### 2. Computed Signal
```typescript
import { computed } from '@angular/core';

const count = signal(0);
const doubleCount = computed(() => count() * 2);

console.log(doubleCount()); // 0
count.set(5);
console.log(doubleCount()); // 10 (se actualiza automáticamente)
```

### 3. Effect
```typescript
import { effect } from '@angular/core';

const count = signal(0);

effect(() => {
  console.log('Count changed:', count());
});

count.set(5); // Console: "Count changed: 5"
```

## 💡 Ejemplo Real en nuestro ComponentService

```typescript
export class ComponentService {
  // 🔥 Signal que almacena todos los componentes
  private componentsSignal = signal<Component[]>([]);
  
  // 🔥 Signal para el estado de carga
  private loadingSignal = signal<boolean>(false);
  
  // 🔥 Signal para el filtro de búsqueda
  private searchFilterSignal = signal<string>('');
  
  // 📊 Computed Signal - Se recalcula automáticamente
  public filteredComponents = computed(() => {
    const components = this.componentsSignal();
    const search = this.searchFilterSignal().toLowerCase();
    
    return components.filter(comp => 
      comp.nombre.toLowerCase().includes(search)
    );
  });
  
  // 📊 Computed Signal - Componentes por categoría
  public htmlCssComponents = computed(() => 
    this.componentsSignal().filter(c => c.categoria.nombre === 'HTML/CSS')
  );
  
  // 📊 Computed Signal - Total de componentes
  public totalComponents = computed(() => this.componentsSignal().length);
}
```

## 🎨 Uso en el Template

```html
<!-- Leer un signal en el template -->
<p>Total: {{ totalComponents() }}</p>

<!-- Usar computed signals -->
@for (component of filteredComponents(); track component.id) {
  <div>{{ component.nombre }}</div>
}

<!-- Condicionales con signals -->
@if (loading()) {
  <div>Cargando...</div>
} @else {
  <div>Contenido cargado</div>
}
```

## 🔄 Actualizar Signals

```typescript
// Método 1: set() - Reemplaza el valor completamente
this.componentsSignal.set([newComponent1, newComponent2]);

// Método 2: update() - Actualiza basándose en el valor anterior
this.componentsSignal.update(components => [...components, newComponent]);

// Método 3: mutate() - Para objetos mutables (usar con cuidado)
this.componentsSignal.mutate(components => {
  components.push(newComponent);
});
```

## ✅ Beneficios en nuestra aplicación

1. **Filtrado reactivo**: Cuando cambias `searchFilterSignal`, `filteredComponents` se actualiza automáticamente
2. **Sin subscripciones**: No necesitas `subscribe()` ni `unsubscribe()`
3. **Rendimiento**: Solo se actualiza lo necesario en el DOM
4. **Código limpio**: Menos boilerplate, más legible

## 🆚 Signals vs RxJS Observables

| Característica | Signals | Observables |
|---------------|---------|-------------|
| Sincronía | Síncrono | Asíncrono |
| Subscripción | Automática | Manual |
| Memory leaks | No | Sí (si no haces unsubscribe) |
| Curva de aprendizaje | Baja | Alta |
| Operadores | Limitados | Muchos (map, filter, etc) |

## 🎯 Cuándo usar Signals

✅ **Usa Signals para:**
- Estado local del componente
- Valores derivados (computed)
- Filtros y búsquedas
- Contadores, toggles, flags

❌ **Usa Observables para:**
- HTTP requests
- WebSockets
- Eventos del DOM complejos
- Operaciones asíncronas complejas

## 🚀 Ejemplo completo en HomeComponent

```typescript
export class HomeComponent {
  private componentService = inject(ComponentService);

  // Exponer signals del servicio
  components = this.componentService.components;
  loading = this.componentService.loading;
  
  // Computed signal local
  featuredComponents = computed(() => {
    return this.components().slice(0, 6);
  });
  
  // Computed signal para estadísticas
  stats = computed(() => [
    {
      label: 'Total Components',
      value: this.componentService.totalComponents(),
      icon: '📦'
    },
    {
      label: 'HTML/CSS',
      value: this.componentService.htmlCssComponents().length,
      icon: '🎨'
    }
  ]);
}
```

## 📝 Conclusión

Signals son el futuro de Angular. Hacen que el código sea más simple, más rápido y más fácil de mantener. En nuestra aplicación, los usamos para:

- ✅ Gestionar el estado de los componentes
- ✅ Filtrar y buscar componentes
- ✅ Calcular estadísticas automáticamente
- ✅ Mostrar estados de carga
- ✅ Derivar valores sin lógica manual

**¡Signals + TypeScript = Código limpio y type-safe! 🚀**
