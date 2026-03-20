# 🏗️ ARCHITECTURE - Full Stack Component Library

Una guía completa sobre cómo funciona este proyecto, desde conceptos fundamentales hasta implementación en producción. Diseñado para aprender tanto **Java/Spring Boot** como **Angular 20 con Signals**.

---

## 📚 Tabla de Contenidos

1. [Conceptos Fundamentales](#conceptos-fundamentales)
2. [Arquitectura General](#arquitectura-general)
3. [Backend: Spring Boot](#backend-spring-boot)
4. [Frontend: Angular 20 + Signals](#frontend-angular-20--signals)
5. [Flujo de Datos](#flujo-de-datos)
6. [Deployment](#deployment)
7. [Entrevista: Preguntas Esperadas](#entrevista-preguntas-esperadas)

---

## 🎯 Conceptos Fundamentales

### ¿Qué es una Aplicación Full Stack?

Una aplicación **Full Stack** tiene dos capas:

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Angular)                    │
│  - Interfaz de usuario (UI)                             │
│  - Lógica de presentación                               │
│  - Comunicación con backend (HTTP)                      │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTP/REST
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (Spring Boot)                  │
│  - API REST                                             │
│  - Lógica de negocio                                    │
│  - Acceso a base de datos                              │
└─────────────────────────────────────────────────────────┘
                          ↕ SQL
┌─────────────────────────────────────────────────────────┐
│              BASE DE DATOS (Supabase/PostgreSQL)         │
│  - Almacenamiento persistente                           │
│  - Tablas, relaciones, integridad                       │
└─────────────────────────────────────────────────────────┘
```

### ¿Qué es una API REST?

REST = **Representational State Transfer**. Es un estándar para que aplicaciones se comuniquen usando HTTP.

**Métodos HTTP:**
- `GET` → Obtener datos (lectura)
- `POST` → Crear datos (escritura)
- `PUT` → Actualizar datos (modificación)
- `DELETE` → Eliminar datos (borrado)

**Ejemplo en nuestro proyecto:**
```
GET    /api/components          → Obtiene lista de componentes
POST   /api/components          → Crea un nuevo componente
GET    /api/components/{id}     → Obtiene un componente específico
PUT    /api/components/{id}     → Actualiza un componente
DELETE /api/components/{id}     → Elimina un componente
```

---

## 🏛️ Arquitectura General

### Estructura del Monorepo

```
LIBCO/
├── backend/                    # Spring Boot (Puerto 8080)
│   ├── src/main/java/
│   │   └── com/librarycomponents/backend/
│   │       ├── model/          # Entidades JPA
│   │       │   ├── Component.java
│   │       │   ├── Categoria.java
│   │       │   └── ComponentAudit.java
│   │       ├── repository/     # Acceso a datos
│   │       │   ├── ComponentRepository.java
│   │       │   ├── CategoriaRepository.java
│   │       │   └── ComponentAuditRepository.java
│   │       ├── service/        # Lógica de negocio
│   │       │   ├── ComponentService.java
│   │       │   └── ComponentAuditService.java
│   │       ├── controller/     # REST Endpoints
│   │       │   ├── ComponentController.java
│   │       │   ├── CategoriaController.java
│   │       │   └── AuditController.java
│   │       ├── config/         # Configuración
│   │       │   └── CorsConfig.java
│   │       └── Application.java
│   ├── pom.xml                 # Dependencias Maven
│   └── mvnw                    # Maven Wrapper
│
├── frontend/                   # Angular 20 (Puerto 4200)
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/         # Interfaces TypeScript
│   │   │   │   └── component.model.ts
│   │   │   ├── services/       # Servicios con Signals
│   │   │   │   └── component.service.ts
│   │   │   ├── pages/          # Componentes de página
│   │   │   │   ├── home/
│   │   │   │   ├── components-view/
│   │   │   │   ├── add-component/
│   │   │   │   └── test-connection/
│   │   │   ├── components/     # Componentes reutilizables
│   │   │   │   ├── floating-lines/
│   │   │   │   ├── split-text/
│   │   │   │   └── dynamic-components/
│   │   │   ├── app.ts          # Componente raíz
│   │   │   ├── app.html        # Template raíz
│   │   │   ├── app.routes.ts   # Rutas
│   │   │   └── app.config.ts   # Configuración
│   │   ├── styles.css          # Estilos globales
│   │   └── index.html          # HTML principal
│   ├── package.json            # Dependencias npm
│   └── tailwind.config.js      # Configuración Tailwind
│
├── README.md                   # Documentación del proyecto
├── ARCHITECTURE.md             # Este archivo
└── .gitignore                  # Archivos ignorados por Git
```

---

## 🔧 Backend: Spring Boot

### ¿Qué es Spring Boot?

Spring Boot es un framework Java que facilita crear aplicaciones web y APIs REST. Simplifica la configuración y permite enfocarse en la lógica de negocio.

**Analogía con Next.js:**
- **Next.js** = Framework React que maneja rutas, SSR, API routes automáticamente
- **Spring Boot** = Framework Java que maneja rutas, inyección de dependencias, acceso a BD automáticamente

### Capas del Backend

#### 1. **Model (Entidad JPA)**

Define la estructura de datos que se guarda en la BD.

```java
@Entity
@Table(name = "componentes")
@Data
public class Component {
    @Id
    private OffsetDateTime id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(name = "codigo_ejemplo", columnDefinition = "TEXT")
    private String codigoEjemplo;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    
    @Column(name = "framework")
    private String framework;
    
    @PrePersist
    protected void onCreate() {
        if (id == null) id = OffsetDateTime.now();
        if (framework == null) framework = "Angular";
    }
}
```

**Explicación:**
- `@Entity` → Esta clase se mapea a una tabla en la BD
- `@Table(name = "componentes")` → Nombre de la tabla en PostgreSQL
- `@Id` → Campo clave primaria
- `@Column` → Define propiedades de la columna
- `@ManyToOne` → Relación: muchos componentes pertenecen a una categoría
- `@PrePersist` → Se ejecuta antes de guardar; asigna valores por defecto

**En la BD se ve así:**
```sql
CREATE TABLE componentes (
    id TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    codigo_ejemplo TEXT,
    categoria_id UUID REFERENCES categorias(id),
    framework VARCHAR(50),
    fecha_creacion TIMESTAMP WITH TIME ZONE
);
```

#### 2. **Repository (Acceso a Datos)**

Interface que extiende `JpaRepository` para operaciones CRUD automáticas.

```java
@Repository
public interface ComponentRepository extends JpaRepository<Component, OffsetDateTime> {
    List<Component> findByCategoria(Categoria categoria);
    List<Component> findByNombreContainingIgnoreCase(String nombre);
}
```

**Métodos automáticos:**
- `findAll()` → SELECT * FROM componentes
- `findById(id)` → SELECT * FROM componentes WHERE id = ?
- `save(component)` → INSERT o UPDATE
- `delete(component)` → DELETE

**Métodos personalizados:**
- `findByCategoria(categoria)` → Busca por categoría
- `findByNombreContainingIgnoreCase(nombre)` → Busca por nombre (case-insensitive)

#### 3. **Service (Lógica de Negocio)**

Contiene la lógica de negocio; usa el repository para acceder a datos.

```java
@Service
public class ComponentService {
    @Autowired
    private ComponentRepository componentRepository;
    
    @Autowired
    private ComponentAuditService auditService;
    
    public Component createComponent(Component component) {
        // Validar
        if (component.getNombre() == null || component.getNombre().isEmpty()) {
            throw new IllegalArgumentException("Nombre requerido");
        }
        
        // Guardar
        Component saved = componentRepository.save(component);
        
        // Auditar
        auditService.logComponentCreated(saved);
        
        return saved;
    }
    
    public List<Component> getAllComponents() {
        return componentRepository.findAll();
    }
    
    public List<Component> searchByName(String nombre) {
        return componentRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
```

**¿Por qué separar en Service?**
- **Reutilización:** El mismo servicio lo usan múltiples controllers
- **Testabilidad:** Fácil de testear sin HTTP
- **Mantenibilidad:** Cambios en lógica en un solo lugar

#### 4. **Controller (REST Endpoints)**

Expone los endpoints HTTP que el frontend llama.

```java
@RestController
@RequestMapping("/api/components")
@CrossOrigin(origins = "https://libco-production.vercel.app")
public class ComponentController {
    
    @Autowired
    private ComponentService componentService;
    
    @GetMapping
    public ResponseEntity<?> getAllComponents() {
        try {
            List<Component> components = componentService.getAllComponents();
            return ResponseEntity.ok(components);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createComponent(@RequestBody Component component) {
        try {
            Component created = componentService.createComponent(component);
            return ResponseEntity.status(201).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getComponentById(@PathVariable OffsetDateTime id) {
        try {
            Optional<Component> component = componentService.getComponentById(id);
            return component.isPresent() 
                ? ResponseEntity.ok(component.get())
                : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
```

**Anotaciones:**
- `@RestController` → Esta clase maneja peticiones HTTP
- `@RequestMapping("/api/components")` → Prefijo de rutas
- `@CrossOrigin` → Permite peticiones desde Vercel (CORS)
- `@GetMapping` → Maneja GET /api/components
- `@PostMapping` → Maneja POST /api/components
- `@RequestBody` → Parsea JSON del body a objeto Java
- `@PathVariable` → Extrae parámetro de la URL

**Flujo de una petición POST:**
```
1. Frontend: POST /api/components { nombre: "Button", ... }
2. Spring: Recibe JSON
3. Controller: Deserializa a Component
4. Service: Valida y guarda
5. Repository: Ejecuta INSERT en BD
6. Service: Audita la creación
7. Controller: Devuelve JSON con el componente creado
8. Frontend: Recibe respuesta 201
```

### Inyección de Dependencias

Spring automáticamente inyecta dependencias con `@Autowired`:

```java
@Service
public class ComponentService {
    @Autowired
    private ComponentRepository componentRepository;  // Spring lo inyecta automáticamente
    
    // Ahora puedo usar componentRepository sin crearlo manualmente
}
```

**Sin inyección (manual):**
```java
ComponentRepository repo = new ComponentRepository();  // ❌ Incorrecto
```

**Con inyección (Spring):**
```java
@Autowired
private ComponentRepository repo;  // ✅ Spring lo crea y lo inyecta
```

---

## 🎨 Frontend: Angular 20 + Signals

### ¿Qué es Angular?

Angular es un framework TypeScript para construir aplicaciones web interactivas. Maneja:
- Componentes reutilizables
- Enrutamiento
- Comunicación HTTP
- Estado reactivo (Signals)

**Analogía con Next.js:**
- **Next.js** = React + rutas + SSR
- **Angular** = Componentes + rutas + Signals (estado reactivo)

### ¿Qué son los Signals?

Los **Signals** son la forma moderna de Angular para manejar estado reactivo. Reemplazan a los Observables en muchos casos.

#### Analogía: Signals vs Next.js

**En Next.js (React):**
```javascript
const [componentes, setComponentes] = useState([]);

useEffect(() => {
  fetch('/api/components')
    .then(res => res.json())
    .then(data => setComponentes(data));
}, []);

return <div>{componentes.map(c => <p>{c.nombre}</p>)}</div>;
```

**En Angular con Signals:**
```typescript
export class ComponentService {
  private componentsSignal = signal<Component[]>([]);
  public readonly components = this.componentsSignal.asReadonly();
  
  constructor(private http: HttpClient) {
    this.loadComponents();
  }
  
  loadComponents() {
    this.http.get<Component[]>('/api/components').subscribe(data => {
      this.componentsSignal.set(data);
    });
  }
}

// En el componente:
export class ComponentsView {
  componentService = inject(ComponentService);
  components = this.componentService.components;
  
  // En el template:
  // @for (component of components(); track component.id) {
  //   <p>{{ component.nombre }}</p>
  // }
}
```

#### ¿Cómo funcionan los Signals?

Un **Signal** es una caja que contiene un valor y notifica cuando cambia:

```typescript
// 1. Crear un signal
const contador = signal(0);

// 2. Leer el valor (llamar como función)
console.log(contador());  // 0

// 3. Cambiar el valor
contador.set(5);
console.log(contador());  // 5

// 4. Actualizar basado en valor anterior
contador.update(prev => prev + 1);
console.log(contador());  // 6

// 5. Computed signal (se actualiza automáticamente)
const contadorDoble = computed(() => contador() * 2);
console.log(contadorDoble());  // 12

// 6. Effect (se ejecuta cuando cambia el signal)
effect(() => {
  console.log('Contador cambió a:', contador());
});
contador.set(10);  // Imprime: "Contador cambió a: 10"
```

**Ventajas sobre Observables:**
- ✅ Sintaxis más simple
- ✅ No necesitas `subscribe()`
- ✅ Mejor performance
- ✅ Más fácil de testear

### Estructura del Frontend

#### 1. **Model (Interface TypeScript)**

Define la estructura de datos que viene del backend.

```typescript
export interface Component {
  id?: string;
  nombre: string;
  descripcion: string;
  codigoEjemplo: string;
  framework: 'Angular' | 'Next.js' | 'Vue' | 'React' | 'HTML/CSS';
  categoria: Categoria;
  fechaCreacion?: Date;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
}
```

#### 2. **Service (Lógica de Negocio)**

Maneja la comunicación con el backend usando Signals.

```typescript
@Injectable({ providedIn: 'root' })
export class ComponentService {
  private readonly API_URL = environment.apiUrl;
  
  // Signals privados
  private componentsSignal = signal<Component[]>([]);
  private categoriasSignal = signal<Categoria[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  
  // Signals públicos (readonly)
  public readonly components = this.componentsSignal.asReadonly();
  public readonly categorias = this.categoriasSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  public readonly error = this.errorSignal.asReadonly();
  
  constructor(private http: HttpClient) {
    this.loadComponents();
    this.loadCategorias();
  }
  
  // Cargar componentes
  loadComponents() {
    this.loadingSignal.set(true);
    this.http.get<Component[]>(`${this.API_URL}/components`)
      .subscribe({
        next: (data) => {
          this.componentsSignal.set(data);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(err.message);
          this.loadingSignal.set(false);
        }
      });
  }
  
  // Crear componente
  createComponent(component: Partial<Component>): Promise<Component> {
    return this.http.post<Component>(
      `${this.API_URL}/components`,
      component
    ).toPromise() as Promise<Component>;
  }
  
  // Cargar categorías
  loadCategorias() {
    this.http.get<Categoria[]>(`${this.API_URL}/categorias`)
      .subscribe({
        next: (data) => this.categoriasSignal.set(data),
        error: (err) => this.errorSignal.set(err.message)
      });
  }
}
```

**¿Por qué Signals en el Service?**
- Centraliza el estado
- Los componentes se suscriben automáticamente
- Cambios en el signal actualizan automáticamente la UI

#### 3. **Componente (Página)**

Usa los Signals del servicio para mostrar datos.

```typescript
@Component({
  selector: 'app-components-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <!-- Mostrar loading -->
      @if (loading()) {
        <p>Cargando...</p>
      }
      
      <!-- Mostrar error -->
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      
      <!-- Mostrar componentes -->
      @if (!loading() && !error()) {
        @for (component of components(); track component.id) {
          <div class="component-card">
            <h3>{{ component.nombre }}</h3>
            <p>{{ component.descripcion }}</p>
            <button (click)="selectComponent(component)">Ver</button>
          </div>
        }
      }
    </div>
  `
})
export class ComponentsViewComponent {
  componentService = inject(ComponentService);
  
  // Acceso a los signals del servicio
  components = this.componentService.components;
  loading = this.componentService.loading;
  error = this.componentService.error;
  
  selectedComponent = signal<Component | null>(null);
  
  selectComponent(component: Component) {
    this.selectedComponent.set(component);
  }
}
```

**Flujo de datos:**
```
1. Componente se crea
2. Inyecta ComponentService
3. Service carga datos del backend (HTTP GET)
4. Signal se actualiza con los datos
5. Template detecta cambio en signal
6. UI se re-renderiza automáticamente
7. Usuario ve los componentes
```

#### 4. **Formulario (Add Component)**

Crea un nuevo componente enviando datos al backend.

```typescript
@Component({
  selector: 'app-add-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input 
        [(ngModel)]="formData.nombre" 
        name="nombre" 
        placeholder="Nombre"
        required
      />
      <textarea 
        [(ngModel)]="formData.descripcion" 
        name="descripcion"
        placeholder="Descripción"
        required
      ></textarea>
      <select 
        [(ngModel)]="formData.framework" 
        name="framework"
        required
      >
        <option value="Angular">Angular</option>
        <option value="Next.js">Next.js</option>
        <option value="Vue">Vue</option>
        <option value="React">React</option>
        <option value="HTML/CSS">HTML/CSS</option>
      </select>
      <select 
        [(ngModel)]="formData.categoriaId" 
        name="categoria"
        required
      >
        @for (cat of categorias(); track cat.id) {
          <option [value]="cat.id">{{ cat.nombre }}</option>
        }
      </select>
      <textarea 
        [(ngModel)]="formData.codigoEjemplo" 
        name="codigo"
        placeholder="Código"
        required
      ></textarea>
      <button type="submit" [disabled]="loading()">
        {{ loading() ? 'Guardando...' : 'Crear' }}
      </button>
    </form>
  `
})
export class AddComponentComponent {
  componentService = inject(ComponentService);
  router = inject(Router);
  
  categorias = this.componentService.categorias;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);
  
  formData = {
    nombre: '',
    descripcion: '',
    codigoEjemplo: '',
    categoriaId: '',
    framework: 'Angular' as const
  };
  
  async onSubmit() {
    this.loading.set(true);
    
    try {
      const categoria = this.categorias().find(c => c.id === this.formData.categoriaId);
      
      const newComponent: Partial<Component> = {
        nombre: this.formData.nombre,
        descripcion: this.formData.descripcion,
        codigoEjemplo: this.formData.codigoEjemplo,
        framework: this.formData.framework,
        categoria: categoria
      };
      
      await this.componentService.createComponent(newComponent);
      this.success.set(true);
      
      // Recargar lista
      this.componentService.loadComponents();
      
      // Redirigir
      setTimeout(() => this.router.navigate(['/components']), 2000);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
```

**Flujo de creación:**
```
1. Usuario completa el formulario
2. Click en "Crear"
3. onSubmit() se ejecuta
4. Valida datos
5. Crea objeto Component
6. Llama a componentService.createComponent()
7. Service hace POST /api/components
8. Backend guarda en BD
9. Backend devuelve 201 con el componente creado
10. Frontend recibe respuesta
11. Recarga lista de componentes
12. Redirige a /components
```

---

## 🔄 Flujo de Datos

### Flujo Completo: Crear un Componente

```
┌──────────────────────────────────────────────────────────────┐
│ 1. FRONTEND: Usuario llena formulario                        │
│    - Nombre: "Button Hover"                                 │
│    - Framework: "React"                                     │
│    - Categoría: "UI Components"                             │
│    - Código: "const Button = () => ..."                     │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. FRONTEND: onSubmit() crea objeto Component               │
│    {                                                         │
│      nombre: "Button Hover",                                │
│      framework: "React",                                    │
│      categoria: { id: "123", nombre: "UI Components" },    │
│      codigoEjemplo: "const Button = () => ..."             │
│    }                                                         │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. FRONTEND: componentService.createComponent()             │
│    Hace POST /api/components con JSON                       │
│    Content-Type: application/json                           │
│    Body: { nombre, framework, categoria, codigoEjemplo }   │
└──────────────────────────────────────────────────────────────┘
                              ↓ HTTP
┌──────────────────────────────────────────────────────────────┐
│ 4. BACKEND: ComponentController.createComponent()           │
│    @PostMapping                                             │
│    @RequestBody Component component                         │
│    - Recibe JSON                                            │
│    - Spring deserializa a objeto Component                  │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. BACKEND: ComponentService.createComponent()              │
│    - Valida que nombre no sea vacío                         │
│    - Valida que categoría exista                            │
│    - Llama a componentRepository.save()                     │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. BACKEND: ComponentRepository.save()                      │
│    - Ejecuta INSERT en PostgreSQL                           │
│    - INSERT INTO componentes (nombre, framework, ...) ...   │
│    - Devuelve el componente con ID generado                │
└──────────────────────────────────────────────────────────────┘
                              ↓ SQL
┌──────────────────────────────────────────────────────────────┐
│ 7. BASE DE DATOS: Supabase/PostgreSQL                       │
│    - Inserta fila en tabla "componentes"                    │
│    - Genera ID automático (timestamp)                       │
│    - Devuelve fila insertada                                │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 8. BACKEND: ComponentAuditService.logComponentCreated()     │
│    - Registra en tabla "component_audit"                    │
│    - Acción: "CREATE"                                       │
│    - Timestamp: ahora                                       │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 9. BACKEND: Devuelve respuesta HTTP 201                     │
│    Status: 201 Created                                      │
│    Body: { id, nombre, framework, categoria, ... }         │
└──────────────────────────────────────────────────────────────┘
                              ↓ HTTP
┌──────────────────────────────────────────────────────────────┐
│ 10. FRONTEND: Recibe respuesta                              │
│     - Status 201 ✅                                         │
│     - Muestra "¡Componente creado!"                         │
│     - Recarga lista de componentes                          │
│     - Redirige a /components                                │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 11. FRONTEND: componentService.loadComponents()             │
│     - Hace GET /api/components                              │
│     - Backend devuelve lista actualizada                    │
│     - Signal se actualiza                                   │
│     - UI se re-renderiza                                    │
│     - Usuario ve el nuevo componente en la lista            │
└──────────────────────────────────────────────────────────────┘
```

### Flujo Completo: Cargar Componentes

```
┌──────────────────────────────────────────────────────────────┐
│ 1. FRONTEND: Usuario abre /components                       │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. FRONTEND: ComponentsViewComponent se crea                │
│    - Inyecta ComponentService                               │
│    - Accede a this.components (signal)                      │
│    - Accede a this.loading (signal)                         │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. FRONTEND: ComponentService.loadComponents()              │
│    - Cambia loadingSignal a true                            │
│    - Hace GET /api/components                               │
└──────────────────────────────────────────────────────────────┘
                              ↓ HTTP
┌──────────────────────────────────────────────────────────────┐
│ 4. BACKEND: ComponentController.getAllComponents()          │
│    @GetMapping                                              │
│    - Llama a componentService.getAllComponents()            │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. BACKEND: ComponentService.getAllComponents()             │
│    - Llama a componentRepository.findAll()                  │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. BACKEND: ComponentRepository.findAll()                   │
│    - Ejecuta SELECT * FROM componentes                      │
└──────────────────────────────────────────────────────────────┘
                              ↓ SQL
┌──────────────────────────────────────────────────────────────┐
│ 7. BASE DE DATOS: Devuelve todas las filas                  │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 8. BACKEND: Devuelve respuesta HTTP 200                     │
│    Status: 200 OK                                           │
│    Body: [ { id, nombre, ... }, { id, nombre, ... }, ... ] │
└──────────────────────────────────────────────────────────────┘
                              ↓ HTTP
┌──────────────────────────────────────────────────────────────┐
│ 9. FRONTEND: Recibe respuesta                               │
│    - componentsSignal.set(data)                             │
│    - loadingSignal.set(false)                               │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 10. FRONTEND: Signals cambian                               │
│     - Angular detecta cambios                               │
│     - Re-renderiza el template                              │
│     - @for (component of components()) se ejecuta           │
│     - Crea un <div> por cada componente                     │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│ 11. FRONTEND: Usuario ve la lista de componentes            │
│     - Cada componente muestra: nombre, descripción, botones │
│     - Puede hacer clic para ver detalles                    │
│     - Puede crear nuevo componente                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment

### Arquitectura en Producción

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO (Navegador)                      │
│              https://libco-production.vercel.app            │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                        │
│  - Hosting estático (HTML, CSS, JS)                        │
│  - CDN global                                              │
│  - Redeploy automático en cada push a main                 │
│  - Variables de entorno: API_URL                           │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   RAILWAY (Backend)                         │
│  - Servidor Java/Spring Boot                              │
│  - Puerto dinámico (${PORT:8080})                          │
│  - Redeploy automático en cada push a main                 │
│  - Variables de entorno: SPRING_DATASOURCE_*               │
└─────────────────────────────────────────────────────────────┘
                              ↕ JDBC
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE (Base de Datos)                       │
│  - PostgreSQL en la nube                                   │
│  - Tablas: componentes, categorias, component_audit        │
│  - Backups automáticos                                     │
│  - Acceso seguro con credenciales                          │
└─────────────────────────────────────────────────────────────┘
```

### Variables de Entorno

**En Vercel (Frontend):**
```
API_URL=https://libco-production.up.railway.app/api
```

**En Railway (Backend):**
```
SPRING_DATASOURCE_URL=jdbc:postgresql://aws-1-us-east-1.pooler.supabase.com:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres.pusykqxuxkbfvnryarww
SPRING_DATASOURCE_PASSWORD=*Torrecilla180
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_PROFILES_ACTIVE=prod
```

### Proceso de Deploy

**Frontend (Vercel):**
1. Push a GitHub `main`
2. Vercel detecta cambios
3. Ejecuta `npm run build`
4. Genera archivos estáticos en `dist/frontend/browser`
5. Sube a CDN global
6. Disponible en `https://libco-production.vercel.app`

**Backend (Railway):**
1. Push a GitHub `main`
2. Railway detecta cambios
3. Ejecuta `mvn -B clean package -DskipTests`
4. Genera JAR en `target/backend-0.0.1-SNAPSHOT.jar`
5. Ejecuta `java -jar target/backend-0.0.1-SNAPSHOT.jar`
6. Disponible en `https://libco-production.up.railway.app`

---

## 🎓 Entrevista: Preguntas Esperadas

### Preguntas sobre Arquitectura

**P: ¿Cómo está estructurado tu proyecto?**

R: Es un monorepo con dos carpetas principales:
- **Backend** (Spring Boot): API REST que expone endpoints `/api/components`, `/api/categorias`, etc.
- **Frontend** (Angular 20): Aplicación web que consume la API usando Signals para estado reactivo.

Ambos se despliegan automáticamente en Vercel (frontend) y Railway (backend) cuando hago push a GitHub.

---

**P: ¿Cuál es la diferencia entre tu backend y frontend?**

R:
- **Backend**: Maneja lógica de negocio, acceso a BD, validaciones. Expone HTTP REST.
- **Frontend**: Interfaz de usuario, formularios, visualización de datos. Consume la API del backend.

El backend es agnóstico del frontend; podría tener múltiples frontends (web, móvil, etc.) consumiendo la misma API.

---

**P: ¿Cómo se comunican frontend y backend?**

R: A través de HTTP REST:
- Frontend hace peticiones GET, POST, PUT, DELETE
- Backend responde con JSON
- Ejemplo: `POST /api/components` con body JSON → Backend guarda en BD → Devuelve 201 con el componente creado

---

### Preguntas sobre Spring Boot

**P: ¿Qué es Spring Boot y por qué lo usaste?**

R: Spring Boot es un framework Java que simplifica crear aplicaciones web. Proporciona:
- Inyección de dependencias automática
- Configuración automática
- Acceso a BD con JPA/Hibernate
- Manejo de HTTP/REST

Lo elegí porque es robusto, escalable y tiene excelente documentación.

---

**P: ¿Cómo funciona la inyección de dependencias en Spring?**

R: Spring automáticamente crea instancias de clases y las inyecta donde se necesitan.

```java
@Service
public class ComponentService {
    @Autowired
    private ComponentRepository repo;  // Spring crea e inyecta automáticamente
}
```

Sin inyección, tendría que hacer `ComponentRepository repo = new ComponentRepository()` manualmente en cada clase.

---

**P: ¿Qué es JPA y cómo lo usaste?**

R: JPA (Java Persistence API) mapea objetos Java a tablas de BD automáticamente.

```java
@Entity
@Table(name = "componentes")
public class Component {
    @Id
    private OffsetDateTime id;
    
    @Column(nullable = false)
    private String nombre;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
```

Con esto, Spring automáticamente:
- Crea la tabla si no existe
- Mapea propiedades a columnas
- Maneja relaciones (ManyToOne)

---

**P: ¿Cómo manejas errores en el backend?**

R: Con try-catch y ResponseEntity:

```java
@PostMapping
public ResponseEntity<?> createComponent(@RequestBody Component component) {
    try {
        Component created = componentService.createComponent(component);
        return ResponseEntity.status(201).body(created);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(400).body("Error: " + e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error interno");
    }
}
```

Devuelvo códigos HTTP apropiados:
- 201 Created → Éxito
- 400 Bad Request → Validación fallida
- 500 Internal Server Error → Error inesperado

---

### Preguntas sobre Angular y Signals

**P: ¿Qué son los Signals y por qué los usaste?**

R: Los Signals son la forma moderna de Angular para manejar estado reactivo. Reemplazan a los Observables en muchos casos.

```typescript
const contador = signal(0);
console.log(contador());  // 0
contador.set(5);
console.log(contador());  // 5
```

Ventajas:
- Sintaxis más simple que Observables
- Mejor performance
- Cambios automáticos en la UI
- Fácil de testear

---

**P: ¿Cómo usaste Signals en tu proyecto?**

R: En el servicio:

```typescript
@Injectable({ providedIn: 'root' })
export class ComponentService {
  private componentsSignal = signal<Component[]>([]);
  public readonly components = this.componentsSignal.asReadonly();
  
  loadComponents() {
    this.http.get<Component[]>('/api/components').subscribe(data => {
      this.componentsSignal.set(data);  // Actualiza el signal
    });
  }
}
```

En el componente:

```typescript
export class ComponentsView {
  components = this.componentService.components;  // Acceso al signal
  
  // En el template:
  // @for (component of components(); track component.id) {
  //   <p>{{ component.nombre }}</p>
  // }
}
```

Cuando el signal cambia, Angular automáticamente re-renderiza el template.

---

**P: ¿Cuál es la diferencia entre un Signal y un Observable?**

R:

| Aspecto | Signal | Observable |
|--------|--------|-----------|
| Sintaxis | `signal()` | `new Observable()` |
| Lectura | `signal()` | `.subscribe()` |
| Actualización | `.set()` | `.next()` |
| Performance | Mejor | Más overhead |
| Complejidad | Simple | Compleja |

Ejemplo:

**Signal:**
```typescript
const count = signal(0);
console.log(count());  // 0
count.set(5);
```

**Observable:**
```typescript
const count$ = new BehaviorSubject(0);
count$.subscribe(val => console.log(val));  // 0
count$.next(5);
```

---

**P: ¿Cómo manejas formularios en Angular?**

R: Con `FormsModule` y two-way binding:

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule]
})
export class AddComponent {
  formData = {
    nombre: '',
    framework: 'Angular'
  };
  
  onSubmit() {
    console.log(this.formData);
  }
}
```

En el template:

```html
<input [(ngModel)]="formData.nombre" name="nombre" />
<select [(ngModel)]="formData.framework" name="framework">
  <option value="Angular">Angular</option>
  <option value="React">React</option>
</select>
<button (click)="onSubmit()">Enviar</button>
```

`[(ngModel)]` hace two-way binding: cambios en el input actualizan la propiedad, y cambios en la propiedad actualizan el input.

---

### Preguntas sobre Deployment

**P: ¿Cómo desplegaste tu aplicación?**

R:
1. **Frontend en Vercel**: Conecté GitHub, Vercel detecta cambios en `main`, ejecuta `npm run build`, despliega en CDN.
2. **Backend en Railway**: Conecté GitHub, Railway detecta cambios, ejecuta `mvn clean package`, despliega el JAR.
3. **BD en Supabase**: PostgreSQL en la nube, credenciales en variables de entorno de Railway.

Cada push a `main` dispara un deploy automático en ambas plataformas.

---

**P: ¿Cómo manejas las credenciales de BD?**

R: Nunca las hardcodeo en el código. Las pongo en variables de entorno:

**En Railway:**
```
SPRING_DATASOURCE_URL=jdbc:postgresql://...
SPRING_DATASOURCE_USERNAME=...
SPRING_DATASOURCE_PASSWORD=...
```

**En el código:**
```java
@Value("${spring.datasource.url}")
private String dbUrl;
```

Spring automáticamente inyecta las variables de entorno.

---

**P: ¿Cómo comunicas el frontend con el backend en producción?**

R: A través de la variable de entorno `API_URL`:

**En Vercel:**
```
API_URL=https://libco-production.up.railway.app/api
```

**En el servicio Angular:**
```typescript
private readonly API_URL = environment.apiUrl;

loadComponents() {
  this.http.get<Component[]>(`${this.API_URL}/components`).subscribe(...);
}
```

Así el frontend siempre llama al backend correcto, sin hardcodear URLs.

---

### Preguntas sobre Decisiones de Diseño

**P: ¿Por qué separaste el código en Model, Service, Controller?**

R: **Separación de responsabilidades**:
- **Model**: Define la estructura de datos
- **Service**: Contiene lógica de negocio
- **Controller**: Expone HTTP endpoints

Ventajas:
- Código reutilizable (mismo servicio en múltiples controllers)
- Fácil de testear (testeo de servicio sin HTTP)
- Mantenible (cambios en lógica en un solo lugar)

---

**P: ¿Por qué usaste Signals en lugar de Observables?**

R: Los Signals son más simples y modernos. Observables son poderosos pero complejos para casos simples. Signals:
- Sintaxis más limpia
- Mejor performance
- Menos boilerplate
- Más fácil de aprender

---

**P: ¿Cómo validaste los datos en el backend?**

R: En el servicio:

```java
public Component createComponent(Component component) {
    if (component.getNombre() == null || component.getNombre().isEmpty()) {
        throw new IllegalArgumentException("Nombre requerido");
    }
    if (component.getCategoria() == null) {
        throw new IllegalArgumentException("Categoría requerida");
    }
    return componentRepository.save(component);
}
```

El controller captura excepciones y devuelve errores HTTP apropiados.

---

**P: ¿Cómo manejaste las relaciones entre tablas?**

R: Con anotaciones JPA:

```java
@Entity
public class Component {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
```

Esto crea una relación:
- Muchos componentes pertenecen a una categoría
- `@JoinColumn` especifica la columna de clave foránea
- `fetch = FetchType.EAGER` carga la categoría automáticamente

---

## 🎯 Resumen para la Entrevista

**Puntos clave a destacar:**

1. **Full Stack**: Entiendo tanto frontend como backend
2. **Arquitectura limpia**: Separación de responsabilidades (Model, Service, Controller)
3. **Tecnologías modernas**: Angular 20 con Signals, Spring Boot 3.5
4. **Deployment automático**: CI/CD con GitHub, Vercel, Railway
5. **Seguridad**: Variables de entorno para credenciales
6. **Escalabilidad**: Código reutilizable, fácil de mantener
7. **Buenas prácticas**: Validación, manejo de errores, logging

**Cómo explicarlo en la entrevista:**

> "Construí una librería de componentes full stack con Angular 20 en el frontend y Spring Boot en el backend. El frontend usa Signals para estado reactivo, lo que es más simple y performante que Observables. El backend expone una API REST que el frontend consume. Ambos se despliegan automáticamente en Vercel y Railway cuando hago push a GitHub. La base de datos está en Supabase, y manejo las credenciales con variables de entorno para seguridad."

---

**¡Éxito en tu entrevista! 🚀**
