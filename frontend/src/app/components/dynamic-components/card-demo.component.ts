import { Component } from '@angular/core';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  template: `
    <div class="demo-card-wrapper">
      <div class="card">
        <h3 class="card-title">Título de la Tarjeta</h3>
        <p class="card-description">
          Esta es una tarjeta de demostración que muestra cómo se vería un componente Card en Angular.
        </p>
        <button class="card-button">Leer más</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-card-wrapper {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 300px;
      background-color: white;
    }
    
    .card-title {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    
    .card-description {
      margin: 0 0 16px 0;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    
    .card-button {
      padding: 8px 16px;
      background-color: #5227ff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    
    .card-button:hover {
      background-color: #3d1fb8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(82, 39, 255, 0.3);
    }
  `]
})
export class CardDemoComponent {}
