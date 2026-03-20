import { Component } from '@angular/core';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  template: `
    <div class="demo-button-wrapper">
      <button class="btn btn-primary" (click)="onPrimaryClick()">
        Primary Button
      </button>
      <button class="btn btn-secondary" (click)="onSecondaryClick()">
        Secondary Button
      </button>
      <p class="demo-text">{{ message }}</p>
    </div>
  `,
  styles: [`
    .demo-button-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      align-items: flex-start;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s ease;
    }
    
    .btn-primary {
      background-color: #5227ff;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #3d1fb8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(82, 39, 255, 0.3);
    }
    
    .btn-secondary {
      background-color: #f0f0f0;
      color: #333;
      border: 1px solid #ddd;
    }
    
    .btn-secondary:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
    }
    
    .demo-text {
      margin: 0;
      font-size: 14px;
      color: #666;
      min-height: 20px;
    }
  `]
})
export class ButtonDemoComponent {
  message: string = '';

  onPrimaryClick() {
    this.message = '✅ Primary button clicked!';
  }

  onSecondaryClick() {
    this.message = '✅ Secondary button clicked!';
  }
}
