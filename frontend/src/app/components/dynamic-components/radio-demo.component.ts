import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="demo-radio-wrapper">
      <div class="radio-group">
        <label *ngFor="let option of options" class="radio-label">
          <input 
            type="radio" 
            [value]="option.value" 
            [(ngModel)]="selected"
            name="demo-radio"
          />
          <span class="radio-text">{{ option.label }}</span>
        </label>
      </div>
      <p class="demo-text">Seleccionado: {{ selected }}</p>
    </div>
  `,
  styles: [`
    .demo-radio-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
    }
    
    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .radio-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    
    .radio-label input[type="radio"] {
      cursor: pointer;
      width: 18px;
      height: 18px;
    }
    
    .radio-text {
      font-size: 14px;
      color: #333;
    }
    
    .radio-label:hover .radio-text {
      color: #5227ff;
    }
    
    .demo-text {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class RadioDemoComponent {
  selected: string = 'option1';
  
  options = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' }
  ];
}
