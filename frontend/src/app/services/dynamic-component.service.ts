import { Injectable, Type } from '@angular/core';
import { InputDemoComponent } from '../components/dynamic-components/input-demo.component';
import { ButtonDemoComponent } from '../components/dynamic-components/button-demo.component';
import { RadioDemoComponent } from '../components/dynamic-components/radio-demo.component';
import { CardDemoComponent } from '../components/dynamic-components/card-demo.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  
  private componentMap: Map<string, Type<any>> = new Map([
    ['Input', InputDemoComponent],
    ['Button', ButtonDemoComponent],
    ['Radio', RadioDemoComponent],
    ['Card', CardDemoComponent],
  ]);

  /**
   * Obtiene el componente de demostración para un nombre de componente
   * @param componentName - Nombre del componente (ej: 'Input', 'Button')
   * @returns Componente de demostración o null si no existe
   */
  getComponentClass(componentName: string): Type<any> | null {
    return this.componentMap.get(componentName) || null;
  }

  /**
   * Verifica si existe un componente de demostración para un nombre
   * @param componentName - Nombre del componente
   * @returns true si existe, false en caso contrario
   */
  hasComponent(componentName: string): boolean {
    return this.componentMap.has(componentName);
  }

  /**
   * Obtiene la lista de componentes disponibles
   * @returns Array de nombres de componentes disponibles
   */
  getAvailableComponents(): string[] {
    return Array.from(this.componentMap.keys());
  }
}
