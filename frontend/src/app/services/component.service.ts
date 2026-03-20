import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, Categoria, VerificationResponse } from '../models/component.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private readonly API_URL = environment.apiUrl;

  // 🔥 SIGNALS - Estado reactivo
  // Signal que almacena todos los componentes
  private componentsSignal = signal<Component[]>([]);
  
  // Signal que almacena las categorías
  private categoriasSignal = signal<Categoria[]>([]);
  
  // Signal para el estado de carga
  private loadingSignal = signal<boolean>(false);
  
  // Signal para errores
  private errorSignal = signal<string | null>(null);
  
  // Signal para el filtro de búsqueda
  private searchFilterSignal = signal<string>('');
  
  // Signal para la categoría seleccionada
  private selectedCategorySignal = signal<string | null>(null);

  // 📊 COMPUTED SIGNALS - Valores derivados automáticamente
  // Componentes filtrados por búsqueda y categoría
  public filteredComponents = computed(() => {
    const components = this.componentsSignal();
    const search = this.searchFilterSignal().toLowerCase();
    const category = this.selectedCategorySignal();

    return components.filter(comp => {
      const matchesSearch = comp.nombre.toLowerCase().includes(search) ||
                           comp.descripcion.toLowerCase().includes(search);
      const matchesCategory = !category || comp.categoria.nombre === category;
      
      return matchesSearch && matchesCategory;
    });
  });

  // Componentes por categoría HTML/CSS
  public htmlCssComponents = computed(() => 
    this.componentsSignal().filter(c => c.categoria.nombre === 'HTML/CSS')
  );

  // Componentes por categoría TypeScript
  public typescriptComponents = computed(() => 
    this.componentsSignal().filter(c => c.categoria.nombre === 'TypeScript')
  );

  // Total de componentes
  public totalComponents = computed(() => this.componentsSignal().length);

  // Exponer signals como readonly
  public readonly components = this.componentsSignal.asReadonly();
  public readonly categorias = this.categoriasSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  public readonly error = this.errorSignal.asReadonly();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  // 🚀 Métodos públicos para actualizar signals
  setSearchFilter(search: string): void {
    this.searchFilterSignal.set(search);
  }

  setSelectedCategory(category: string | null): void {
    this.selectedCategorySignal.set(category);
  }

  // 📡 Cargar datos iniciales
  private loadInitialData(): void {
    this.loadComponents();
    this.loadCategorias();
  }

  // 📥 Cargar componentes desde el backend
  loadComponents(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Component[]>(`${this.API_URL}/components`).subscribe({
      next: (components) => {
        this.componentsSignal.set(components);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set('Error al cargar componentes');
        this.loadingSignal.set(false);
        console.error('Error loading components:', error);
      }
    });
  }

  // 📥 Cargar categorías desde el backend
  loadCategorias(): void {
    this.http.get<Categoria[]>(`${this.API_URL}/categorias`).subscribe({
      next: (categorias) => {
        this.categoriasSignal.set(categorias);
      },
      error: (error) => {
        console.error('Error loading categorias:', error);
      }
    });
  }

  // ➕ Crear nuevo componente
  createComponent(component: Partial<Component>): Promise<Component> {
    return this.http.post<Component>(`${this.API_URL}/components`, component).toPromise() as Promise<Component>;
  }

  // 🔄 Actualizar componente
  updateComponent(id: string, component: Partial<Component>): Observable<Component> {
    return this.http.put<Component>(`${this.API_URL}/components/${id}`, component);
  }

  // 🗑️ Eliminar componente
  deleteComponent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/components/${id}`);
  }

  // 🔍 Buscar por categoría
  getComponentsByCategory(categoryName: string): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.API_URL}/components/categoria/${categoryName}`);
  }

  // 🔍 Buscar por nombre
  searchComponentsByName(name: string): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.API_URL}/components/search?nombre=${name}`);
  }

  // 📊 Verificar componentes nuevos
  verifyNewComponents(): Observable<VerificationResponse> {
    return this.http.get<VerificationResponse>(`${this.API_URL}/audit/verify-new-components`);
  }
}
