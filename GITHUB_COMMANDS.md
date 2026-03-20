# 📝 Comandos para GitHub y Deployment

## 🔑 Configuración Inicial de Git

### 1. Configurar Git (Primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"
```

### 2. Inicializar Repositorio Local

```bash
# Desde la carpeta raíz del proyecto
cd "c:\Users\guzen\Downloads\backend (1)"

# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Component Library - Full Stack App with Angular 20 + Spring Boot"
```

---

## 🌐 Crear Repositorio en GitHub

### 1. En GitHub.com

1. Click en **"+"** (arriba a la derecha)
2. Seleccionar **"New repository"**
3. Nombre: `component-library` (o el que prefieras)
4. Descripción: `Full Stack Component Library with Angular 20 + Spring Boot`
5. Seleccionar **"Public"** o **"Private"**
6. **NO** inicializar con README (ya lo tenemos)
7. Click en **"Create repository"**

### 2. Conectar Repositorio Local a GitHub

```bash
# Reemplaza USER con tu usuario de GitHub y REPO con el nombre del repositorio
git remote add origin https://github.com/USER/REPO.git

# Cambiar rama a main
git branch -M main

# Push inicial
git push -u origin main
```

---

## 📤 Comandos Git Diarios

### Ver Estado
```bash
git status
```

### Agregar Cambios
```bash
# Agregar un archivo específico
git add ruta/del/archivo

# Agregar todos los cambios
git add .
```

### Hacer Commit
```bash
git commit -m "Descripción clara del cambio"

# Ejemplos:
git commit -m "feat: agregar campo framework al formulario"
git commit -m "fix: corregir validación de categoría"
git commit -m "docs: actualizar README con instrucciones de deployment"
```

### Enviar a GitHub
```bash
# Push a rama actual
git push origin nombre-rama

# Push a main
git push origin main

# Push a develop
git push origin develop
```

### Traer Cambios Remotos
```bash
git pull origin nombre-rama
```

---

## 🌳 Gestión de Ramas

### Crear Nueva Rama
```bash
# Crear y cambiar a nueva rama
git checkout -b feature/nombre-feature

# Ejemplo:
git checkout -b feature/add-vue-components
```

### Cambiar de Rama
```bash
git checkout nombre-rama

# Ejemplo:
git checkout develop
```

### Ver Todas las Ramas
```bash
# Locales
git branch

# Remotas
git branch -a

# Locales y remotas
git branch -av
```

### Eliminar Rama
```bash
# Local
git branch -d nombre-rama

# Remota
git push origin --delete nombre-rama
```

---

## 🔄 Workflow Recomendado

### 1. Crear Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad
```

### 2. Hacer Cambios y Commits
```bash
# Editar archivos...

git add .
git commit -m "feat: descripción del cambio"
git commit -m "fix: corregir bug"
git commit -m "refactor: mejorar código"

git push origin feature/nueva-funcionalidad
```

### 3. Crear Pull Request en GitHub
1. Ir a https://github.com/USER/REPO
2. Click en **"Pull requests"**
3. Click en **"New pull request"**
4. Comparar: `feature/nueva-funcionalidad` → `develop`
5. Agregar descripción
6. Click en **"Create pull request"**
7. Esperar revisión y merge

### 4. Merge a Main (Producción)
```bash
git checkout main
git pull origin main
git merge develop
git push origin main
```

---

## 🚀 Deployment Automático

### Frontend (Vercel)

```bash
# 1. Hacer cambios en frontend
cd frontend
npm install  # si agregaste dependencias
git add .
git commit -m "feat: cambios en frontend"
git push origin main

# Vercel automáticamente:
# - Detecta el push a main
# - Ejecuta: npm run build
# - Despliega a producción
```

### Backend (Railway)

```bash
# 1. Hacer cambios en backend
cd backend
git add .
git commit -m "feat: cambios en backend"
git push origin main

# Railway automáticamente:
# - Detecta el push a main
# - Ejecuta: mvn clean package -DskipTests
# - Despliega a producción
```

---

## 📋 Convenciones de Commits

```bash
# Feature (nueva funcionalidad)
git commit -m "feat: agregar campo framework"

# Fix (corrección de bug)
git commit -m "fix: corregir validación de categoría"

# Docs (documentación)
git commit -m "docs: actualizar README"

# Style (formato, sin cambios lógicos)
git commit -m "style: formatear código"

# Refactor (reorganizar código)
git commit -m "refactor: mejorar estructura de servicios"

# Test (agregar tests)
git commit -m "test: agregar tests para ComponentService"

# Chore (tareas de mantenimiento)
git commit -m "chore: actualizar dependencias"
```

---

## 🆘 Comandos Útiles para Problemas

### Ver Historial de Commits
```bash
git log

# Últimos 5 commits
git log -5

# Con formato bonito
git log --oneline --graph --all
```

### Deshacer Cambios
```bash
# Deshacer cambios en archivo (antes de add)
git checkout -- ruta/del/archivo

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (perder cambios)
git reset --hard HEAD~1
```

### Ver Diferencias
```bash
# Cambios no staged
git diff

# Cambios staged
git diff --staged

# Diferencias entre ramas
git diff main develop
```

### Stash (Guardar cambios temporalmente)
```bash
# Guardar cambios sin commit
git stash

# Ver stashes guardados
git stash list

# Recuperar stash
git stash pop

# Descartar stash
git stash drop
```

---

## 🔐 Secrets y Variables de Entorno

### En Vercel (Frontend)
```
VITE_API_URL=https://tu-backend-railway.up.railway.app/api
```

### En Railway (Backend)
```
SPRING_DATASOURCE_URL=postgresql://user:password@host:5432/db
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_PROFILES_ACTIVE=prod
```

---

## 📊 Estado del Repositorio

### Verificar Remotes
```bash
git remote -v
```

### Cambiar URL del Remote
```bash
git remote set-url origin https://github.com/USER/REPO.git
```

### Ver Información del Remote
```bash
git remote show origin
```

---

## ✅ Checklist Antes de Push

- [ ] Código compilado sin errores
- [ ] Tests pasando (si existen)
- [ ] Cambios relacionados en un solo commit
- [ ] Mensaje de commit claro y descriptivo
- [ ] Sin archivos innecesarios (.env, node_modules, etc.)
- [ ] Variables de entorno configuradas
- [ ] URLs de API correctas

---

## 🎯 Próximos Pasos

1. **Crear repositorio en GitHub**
   ```bash
   git remote add origin https://github.com/USER/component-library.git
   git branch -M main
   git push -u origin main
   ```

2. **Crear rama develop**
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

3. **Conectar Vercel**
   - Ir a vercel.com
   - Conectar GitHub
   - Seleccionar repositorio
   - Configurar root directory: `frontend`

4. **Conectar Railway**
   - Ir a railway.app
   - Conectar GitHub
   - Seleccionar repositorio
   - Configurar variables de entorno

5. **Configurar Supabase**
   - Usar credenciales existentes
   - Verificar que la BD está activa

---

## 📞 Recursos

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Vercel Deployment](https://vercel.com/docs)
- [Railway Deployment](https://docs.railway.app)
- [Conventional Commits](https://www.conventionalcommits.org)
