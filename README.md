# 🎨 Component Library - Full Stack Application

Una librería de componentes reutilizables construida con **Spring Boot** (backend) y **Angular 20** (frontend), utilizando **Signals**, y una UI moderna. Desplegada en **Vercel** (frontend) y **Railway** (backend).

**🚀 Aplicación en vivo:**
- Frontend: https://libco-production.vercel.app
- Backend API: https://libco-production.up.railway.app/api
- Base de datos: Supabase PostgreSQL

**📚 Documentación completa:**
- Lee **ARCHITECTURE.md** para una guía detallada sobre cómo funciona todo el proyecto, conceptos de Angular Signals, Spring Boot, y cómo prepararse para entrevistas técnicas.

## 📁 Estructura del Proyecto (Monorepo)

```
backend (1)/
├── backend/              # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/librarycomponents/backend/
│   │   │   │   ├── model/           # Entidades JPA
│   │   │   │   ├── repository/      # Repositorios
│   │   │   │   ├── service/         # Lógica de negocio
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── cli/             # Comandos CLI
│   │   │   │   ├── scheduler/       # Jobs automáticos
│   │   │   │   └── config/          # Configuración
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
├── frontend/             # Angular 20 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/              # Interfaces TypeScript
│   │   │   ├── services/            # Servicios con Signals
│   │   │   ├── factories/           # Factory Pattern
│   │   │   ├── pages/               # Componentes de página
│   │   │   │   ├── home/
│   │   │   │   ├── components-view/
│   │   │   │   ├── add-component/
│   │   │   │   └── test-connection/
│   │   │   ├── components/          # Componentes reutilizables
│   │   │   │   ├── floating-lines/
│   │   │   │   ├── split-text/
│   │   │   │   └── dynamic-components/
│   │   │   ├── app.ts
│   │   │   ├── app.html
│   │   │   ├── app.routes.ts
│   │   │   └── app.config.ts
│   │   ├── styles.css               # Estilos globales + Tailwind
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.production              # Variables de entorno producción
│
├── README.md                         # Este archivo
├── ARCHITECTURE.md                   # Guía completa del proyecto
└── .gitignore                        # Archivos ignorados por Git
```

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Spring Boot 3.5.11** - Framework Java
- **PostgreSQL** - Base de datos (Supabase)
- **JPA/Hibernate** - ORM
- **Spring Scheduler** - Jobs automáticos
- **Spring Shell** - Comandos CLI
- **Lombok** - Reducir boilerplate

### Frontend
- **Angular 20** - Framework frontend
- **Signals** - Estado reactivo
- **TailwindCSS** - Estilos utility-first
- **TypeScript** - Type safety
- **HttpClient** - Comunicación con API
- **Factory Pattern** - Creación de componentes

---

## 📊 Características Principales

### Backend

#### ✅ API REST Completa
- `GET /api/components` - Listar todos los componentes
- `POST /api/components` - Crear componente
- `PUT /api/components/{id}` - Actualizar componente
- `DELETE /api/components/{id}` - Eliminar componente
- `GET /api/components/categoria/{nombre}` - Filtrar por categoría
- `GET /api/components/search?nombre={nombre}` - Buscar por nombre

#### ✅ Sistema de Auditoría
- Registra automáticamente cada componente nuevo
- Endpoint `GET /api/audit/verify-new-components` para verificar componentes nuevos
- Respuesta estructurada con detalles de componentes agregados

#### ✅ Job Automático Diario
- Se ejecuta cada día a las **00:00 (medianoche)**
- Verifica componentes nuevos automáticamente
- Imprime reporte en consola del servidor

#### ✅ Comandos CLI (como Laravel Artisan)
```bash
# En la terminal del servidor Spring Boot
component verify      # Verifica componentes nuevos
component list        # Lista todos los componentes auditados
component status      # Muestra estado general
component help        # Ayuda de comandos
```

### Frontend

#### ✅ Signals (Estado Reactivo)
```typescript
// Signal básico
const components = signal<Component[]>([]);

// Computed signal (se actualiza automáticamente)
const filteredComponents = computed(() => {
  return components().filter(c => c.nombre.includes(search()));
});

// Uso en template
{{ filteredComponents() }}
```

#### ✅ Factory Pattern
```typescript
// Crear componente HTML/CSS
const factory = new HtmlCssComponentFactory();
const component = factory.createComponent(template, categoria);

// Crear componente TypeScript
const factory = new TypeScriptComponentFactory();
const component = factory.createComponent(template, categoria);
```

#### ✅ UI Moderna
- Diseño inspirado en **ReactBits**
- Colores: Primary (azul), Accent (morado), Dark (gris oscuro)
- Animaciones suaves y transiciones
- Responsive design
- Cards con hover effects
- Gradientes modernos

---

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Java 21** o superior
- **Node.js 22** o superior
- **PostgreSQL** (o cuenta de Supabase)
- **Maven** (incluido con mvnw)
- **Angular CLI 20**

### 1. Configurar Backend

```bash
cd backend

# Configurar base de datos en application.properties
# spring.datasource.url=jdbc:postgresql://...

# Ejecutar backend
./mvnw spring-boot:run

# Backend corriendo en http://localhost:8080
```

### 2. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar frontend
ng serve

# Frontend corriendo en http://localhost:4200
```

---

## 📖 Documentación Detallada

### 🔥 Signals
Lee `frontend/SIGNALS_EXPLAINED.md` para entender:
- Qué son los Signals
- Tipos de Signals (signal, computed, effect)
- Ventajas sobre Observables
- Ejemplos de uso en la aplicación

### 🏭 Factory Pattern
Lee `frontend/FACTORY_PATTERN_EXPLAINED.md` para entender:
- Qué es el Factory Pattern
- Cómo implementarlo
- Ventajas y casos de uso
- Extensibilidad del patrón

---

## 🎯 Flujo de Datos

```
┌─────────────┐
│   Angular   │
│  (Frontend) │
└──────┬──────┘
       │ HTTP Request
       │ (HttpClient)
       ↓
┌─────────────┐
│ Spring Boot │
│  (Backend)  │
└──────┬──────┘
       │ JPA/Hibernate
       ↓
┌─────────────┐
│ PostgreSQL  │
│  (Supabase) │
└─────────────┘
```

### Ejemplo: Crear Componente

1. **Usuario** hace clic en "Crear Componente" en Angular
2. **Factory** crea el objeto Component con formato correcto
3. **ComponentService** envía POST a `/api/components`
4. **Spring Boot** recibe la petición en `ComponentController`
5. **ComponentService** (backend) guarda en BD
6. **ComponentAuditService** registra en auditoría automáticamente
7. **Signal** se actualiza en frontend
8. **UI** se actualiza automáticamente (reactivo)

---

## 🎨 Paleta de Colores (ReactBits Inspired)

```css
/* Primary (Azul) */
--primary-500: #0ea5e9;
--primary-600: #0284c7;

/* Accent (Morado) */
--accent-500: #d946ef;
--accent-600: #c026d3;

/* Dark (Fondo oscuro) */
--dark-900: #0f172a;
--dark-800: #1e293b;
--dark-700: #334155;
```

---

## 📝 Categorías de Componentes

### 1. HTML/CSS
Componentes puros sin JavaScript:
- Botones
- Cards
- Formularios
- Layouts
- Navegación

### 2. TypeScript (Angular)
Componentes interactivos con Signals:
- Contadores
- Todo Lists
- Modales
- Tabs
- Carousels

---

## 🧪 Testing

### Backend
```bash
cd backend
./mvnw test
```

### Frontend
```bash
cd frontend
ng test
```

---

## 🚀 Despliegue (En Vivo)

### Frontend (Vercel)
```bash
# Automático: cada push a main en GitHub
# Vercel ejecuta: npm run build
# Output: dist/frontend/browser
# URL: https://libco-production.vercel.app
```

### Backend (Railway)
```bash
# Automático: cada push a main en GitHub
# Railway ejecuta: mvn -B clean package -DskipTests
# Start: java -jar target/backend-0.0.1-SNAPSHOT.jar
# URL: https://libco-production.up.railway.app/api
```

### Base de Datos (Supabase)
```
Host: aws-1-us-east-1.pooler.supabase.com
Database: postgres
Credenciales: En variables de entorno de Railway
```

**Para desplegar localmente:**
```bash
# Backend
cd backend
./mvnw spring-boot:run

# Frontend (en otra terminal)
cd frontend
npm install
ng serve
```

---

## 📚 Recursos Adicionales

- [Angular Signals Documentation](https://angular.dev/guide/signals)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Factory Pattern](https://refactoring.guru/design-patterns/factory-method)

---

## 👨‍💻 Desarrollo

### Agregar nueva categoría de componentes

1. **Backend**: Crear nueva categoría en BD
2. **Frontend**: Crear nueva Factory
```typescript
export class VueComponentFactory extends ComponentFactory {
  createComponent(template: ComponentTemplate, categoria: Categoria) {
    return {
      ...template,
      tags: [...template.tags, 'Vue', 'Composition API']
    };
  }
}
```
3. **Registrar** en ComponentFactoryManager
4. **Crear** página para la nueva categoría

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## ✨ Características Destacadas

- ✅ **Monorepo** - Backend y Frontend en un solo repositorio
- ✅ **Signals** - Estado reactivo moderno en Angular
- ✅ **Factory Pattern** - Código escalable y mantenible
- ✅ **TailwindCSS** - Estilos utility-first
- ✅ **Spring Shell** - Comandos CLI como Laravel
- ✅ **Auditoría automática** - Tracking de componentes nuevos
- ✅ **Jobs programados** - Verificación diaria automática
- ✅ **UI Moderna** - Inspirada en ReactBits
- ✅ **Type-safe** - TypeScript + Java con tipos fuertes
- ✅ **Responsive** - Funciona en móviles y desktop

---

**¡Construido con ❤️ usando Angular 20 + Spring Boot + Signals + Factory Pattern!**
