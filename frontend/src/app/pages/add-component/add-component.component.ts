import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentService } from '../../services/component.service';
import { Component as ComponentModel } from '../../models/component.model';

@Component({
  selector: 'app-add-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-component.component.html',
  styleUrl: './add-component.component.css'
})
export class AddComponentComponent {
  private componentService = inject(ComponentService);
  private router = inject(Router);

  // Signals
  categorias = this.componentService.categorias;
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  // Form data
  formData = {
    nombre: '',
    descripcion: '',
    codigoEjemplo: '',
    categoriaId: '',
    framework: 'Angular' as 'Angular' | 'Next.js' | 'Vue' | 'React' | 'HTML/CSS'
  };

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    // Encontrar la categoría seleccionada
    const categoria = this.categorias().find(c => c.id === this.formData.categoriaId);
    
    if (!categoria) {
      this.error.set('Categoría no encontrada');
      this.loading.set(false);
      return;
    }

    // Preparar el componente
    const newComponent: Partial<ComponentModel> = {
      nombre: this.formData.nombre.trim(),
      descripcion: this.formData.descripcion.trim(),
      codigoEjemplo: this.formData.codigoEjemplo.trim(),
      framework: this.formData.framework,
      categoria: categoria
    };

    try {
      // Enviar al backend
      const component = await this.componentService.createComponent(newComponent);
      console.log('✅ Componente creado:', component);
      this.success.set(true);
      this.loading.set(false);
      
      // Recargar componentes
      this.componentService.loadComponents();
      
      // Resetear formulario
      this.resetForm();
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/components']);
      }, 2000);
    } catch (err: any) {
      console.error('❌ Error al crear componente:', err);
      this.error.set(err.error?.message || 'Error al crear el componente');
      this.loading.set(false);
    }
  }

  validateForm(): boolean {
    if (!this.formData.nombre.trim()) {
      this.error.set('El nombre es requerido');
      return false;
    }
    if (!this.formData.descripcion.trim()) {
      this.error.set('La descripción es requerida');
      return false;
    }
    if (!this.formData.codigoEjemplo.trim()) {
      this.error.set('El código de ejemplo es requerido');
      return false;
    }
    if (!this.formData.categoriaId) {
      this.error.set('Debes seleccionar una categoría');
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.formData = {
      nombre: '',
      descripcion: '',
      codigoEjemplo: '',
      categoriaId: '',
      framework: 'Angular' as 'Angular' | 'Next.js' | 'Vue' | 'React' | 'HTML/CSS'
    };
  }

  cancel(): void {
    this.router.navigate(['/components']);
  }
}
