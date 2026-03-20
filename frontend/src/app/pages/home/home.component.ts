import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComponentService } from '../../services/component.service';
import { Component as ComponentModel } from '../../models/component.model';
import { FloatingLinesComponent } from '../../components/floating-lines/floating-lines.component';
import { SplitTextComponent } from '../../components/split-text/split-text.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FloatingLinesComponent, SplitTextComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private componentService = inject(ComponentService);

  // Signals del servicio
  components = this.componentService.components;
  loading = this.componentService.loading;
  error = this.componentService.error;
  categorias = this.componentService.categorias;
  
  // UI State
  showComponents = signal(false);
  selectedComponent = signal<ComponentModel | null>(null);
  
  // Welcome texts
  welcomeTitle = 'Welcome to the library of Kike';
  welcomeSubtitle = "Let's go to see what are here";
  
  // Computed signals para estadísticas
  htmlCssCount = this.componentService.htmlCssComponents;
  typescriptCount = this.componentService.typescriptComponents;
  totalCount = this.componentService.totalComponents;

  // Estadísticas de la librería
  stats = computed(() => [
    {
      label: 'Total Components',
      value: this.totalCount(),
      icon: '📦'
    },
    {
      label: 'HTML/CSS',
      value: this.htmlCssCount().length,
      icon: '🎨'
    },
    {
      label: 'TypeScript',
      value: this.typescriptCount().length,
      icon: '⚡'
    }
  ]);

  // Obtener componentes por categoría
  getComponentsByCategory(categoryName: string) {
    return this.components().filter(c => c.categoria.nombre === categoryName);
  }

  // Scroll suave a un componente
  scrollToComponent(componentId: string): void {
    const element = document.getElementById('component-' + componentId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Copiar código al portapapeles
  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      console.log('Código copiado al portapapeles');
    });
  }

  // Seleccionar componente para preview
  selectComponent(component: ComponentModel): void {
    this.selectedComponent.set(component);
    this.showComponents.set(false);
  }
}
