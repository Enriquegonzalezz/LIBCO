import { Component, inject, signal, computed, effect, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '../../services/component.service';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { Component as ComponentModel } from '../../models/component.model';
import { Categoria } from '../../models/component.model';

type TabType = 'preview' | 'code';
type FrameworkType = 'Angular' | 'Next.js' | 'Vue' | 'HTML/CSS' | 'React';

interface ComponentsByFramework {
  framework: FrameworkType;
  componentes: ComponentModel[];
}

@Component({
  selector: 'app-components-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './components-view.component.html',
  styleUrl: './components-view.component.css'
})
export class ComponentsViewComponent implements AfterViewInit {
  // ============================================
  // INYECCIONES
  // ============================================
  private componentService = inject(ComponentService);
  private dynamicComponentService = inject(DynamicComponentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // ============================================
  // VIEW CHILD
  // ============================================
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;

  // ============================================
  // SIGNALS DEL SERVICIO
  // ============================================
  components = this.componentService.components;
  loading = this.componentService.loading;
  error = this.componentService.error;
  categorias = this.componentService.categorias;

  // ============================================
  // UI STATE SIGNALS
  // ============================================
  selectedComponent = signal<ComponentModel | null>(null);
  activeTab = signal<TabType>('preview');
  isSidebarOpen = signal(false);

  // ============================================
  // COMPUTED SIGNALS (DERIVADOS)
  // ============================================
  
  /**
   * Agrupa componentes por framework
   * Retorna array de objetos con framework y sus componentes UI
   */
  componentsByFramework = computed<ComponentsByFramework[]>(() => {
    const comps = this.components();
    
    // Filtrar solo componentes de UI
    const uiComponents = comps.filter(c => c.isUIComponent !== false);
    
    // Frameworks soportados
    const frameworks: FrameworkType[] = ['Angular', 'Next.js', 'Vue', 'HTML/CSS', 'React'];
    
    return frameworks.map(framework => ({
      framework,
      componentes: uiComponents.filter(c => c.framework === framework)
    })).filter(group => group.componentes.length > 0);
  });

  /**
   * Verifica si hay un componente seleccionado
   */
  hasSelectedComponent = computed(() => this.selectedComponent() !== null);

  /**
   * Verifica si está en modo preview
   */
  isPreviewMode = computed(() => this.activeTab() === 'preview');

  /**
   * Verifica si está en modo código
   */
  isCodeMode = computed(() => this.activeTab() === 'code');

  // ============================================
  // CONSTRUCTOR Y LIFECYCLE
  // ============================================
  constructor() {
    // Cargar componentes al inicializar
    effect(() => {
      if (this.components().length === 0 && !this.loading()) {
        this.componentService.loadComponents();
      }
    });

    // Renderizar componente dinámicamente cuando se selecciona uno
    effect(() => {
      if (this.isAngularComponent() && this.activeTab() === 'preview') {
        // Usar setTimeout para asegurar que el DOM y ViewChild están listos
        setTimeout(() => {
          if (this.dynamicComponentContainer) {
            this.renderDynamicComponent();
          }
        }, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    // Lifecycle hook implementado para la interfaz AfterViewInit
  }

  // ============================================
  // MÉTODOS PÚBLICOS
  // ============================================

  /**
   * Selecciona un componente y lo muestra en el panel derecho
   * @param component - Componente a seleccionar
   */
  selectComponent(component: ComponentModel): void {
    this.selectedComponent.set(component);
    
    // Si es Angular, mostrar preview; si no, mostrar código
    if (component.framework === 'Angular') {
      this.activeTab.set('preview');
    } else {
      this.activeTab.set('code');
    }
    
    // Cerrar sidebar en móvil después de seleccionar
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    }
  }

  /**
   * Alterna la visibilidad del sidebar en móvil
   */
  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  /**
   * Cambia la pestaña activa (preview o código)
   * @param tab - Tipo de pestaña a mostrar
   */
  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  /**
   * Copia el código del componente al portapapeles
   * @param code - Código a copiar
   */
  async copyCode(code: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      console.log('✅ Código copiado al portapapeles');
    } catch (error) {
      console.error('❌ Error al copiar código:', error);
    }
  }

  /**
   * Retorna el código de ejemplo del componente seleccionado
   */
  getSelectedComponentCode(): string {
    return this.selectedComponent()?.codigoEjemplo || '';
  }

  /**
   * Retorna la descripción del componente seleccionado
   */
  getSelectedComponentDescription(): string {
    return this.selectedComponent()?.descripcion || '';
  }

  /**
   * Retorna el nombre del componente seleccionado
   */
  getSelectedComponentName(): string {
    return this.selectedComponent()?.nombre || '';
  }

  /**
   * Verifica si el componente seleccionado es de Angular
   */
  isAngularComponent(): boolean {
    return this.selectedComponent()?.framework === 'Angular';
  }

  /**
   * Verifica si el componente seleccionado es de Next.js, Vue o React
   */
  isCodeOnlyComponent(): boolean {
    const framework = this.selectedComponent()?.framework;
    return framework === 'Next.js' || framework === 'Vue' || framework === 'React' || framework === 'HTML/CSS';
  }

  /**
   * Retorna el nombre del framework del componente seleccionado
   */
  getSelectedFramework(): string {
    return this.selectedComponent()?.framework || '';
  }

  /**
   * Navega a la página de agregar nuevo componente
   */
  openNewComponentModal(): void {
    this.router.navigate(['/add-component']);
  }


  /**
   * Renderiza dinámicamente el componente en el preview
   */
  renderDynamicComponent(): void {
    const selectedComp = this.selectedComponent();
    if (!selectedComp || !this.isAngularComponent() || !this.dynamicComponentContainer) {
      return;
    }

    // Obtener el componente de demostración
    const componentClass = this.dynamicComponentService.getComponentClass(selectedComp.nombre);
    if (!componentClass) {
      console.warn(`No demo component found for: ${selectedComp.nombre}`);
      return;
    }

    // Limpiar el contenedor anterior
    this.dynamicComponentContainer.clear();

    // Crear instancia del componente dinámicamente
    try {
      this.dynamicComponentContainer.createComponent(componentClass);
    } catch (error) {
      console.error('Error rendering dynamic component:', error);
    }
  }
}
