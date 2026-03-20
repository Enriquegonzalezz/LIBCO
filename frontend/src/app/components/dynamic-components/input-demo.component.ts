import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="demo-input-wrapper">
      <input 
        type="text" 
        [(ngModel)]="value" 
        placeholder="Ingresa texto..."
        class="demo-input"
      />
      <p class="demo-text">Valor: {{ value }}</p>
    </div>
  `,
  styles: [`
    .demo-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
    }
    
    .demo-input {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      font-family: inherit;
    }
    
    .demo-input:focus {
      outline: none;
      border-color: #5227ff;
      box-shadow: 0 0 0 3px rgba(82, 39, 255, 0.1);
    }
    
    .demo-text {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class InputDemoComponent {
  value: string = '';
}
