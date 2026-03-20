import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-connection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h2>🔌 Test de Conexión Backend</h2>
      
      <div class="test-section">
        <button class="test-btn" (click)="testConnection()">
          Probar Conexión
        </button>
        
        @if (loading()) {
          <p class="status loading">⏳ Probando conexión...</p>
        }
        
        @if (result()) {
          <div class="result success">
            <h3>✅ Conexión Exitosa!</h3>
            <p><strong>Backend URL:</strong> {{ apiUrl }}</p>
            <p><strong>Status:</strong> {{ result()?.status }}</p>
            <p><strong>Componentes encontrados:</strong> {{ result()?.data?.length || 0 }}</p>
            
            @if (result()?.data && result()!.data.length > 0) {
              <div class="components-list">
                <h4>Componentes:</h4>
                <ul>
                  @for (comp of result()!.data; track comp.id) {
                    <li>{{ comp.nombre }} - {{ comp.categoria?.nombre }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        }
        
        @if (error()) {
          <div class="result error">
            <h3>❌ Error de Conexión</h3>
            <p><strong>Backend URL:</strong> {{ apiUrl }}</p>
            <p><strong>Error:</strong> {{ error() }}</p>
            <div class="troubleshooting">
              <h4>💡 Soluciones:</h4>
              <ul>
                <li>Verifica que el backend esté corriendo en <code>http://localhost:8080</code></li>
                <li>Ejecuta: <code>cd backend && ./mvnw spring-boot:run</code></li>
                <li>Verifica que CORS esté configurado en Spring Boot</li>
                <li>Revisa la consola del backend para errores</li>
              </ul>
            </div>
          </div>
        }
      </div>

      <div class="test-section">
        <h3>🔍 Test de Categorías</h3>
        <button class="test-btn secondary" (click)="testCategorias()">
          Probar Categorías
        </button>
        
        @if (categorias()) {
          <div class="result success">
            <p><strong>Categorías encontradas:</strong> {{ categorias()?.length || 0 }}</p>
            @if (categorias() && categorias()!.length > 0) {
              <ul>
                @for (cat of categorias()!; track cat.id) {
                  <li>{{ cat.nombre }}</li>
                }
              </ul>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: var(--dark-800);
      border-radius: var(--radius-xl);
      border: 1px solid var(--dark-700);
    }

    h2 {
      color: var(--dark-50);
      margin-bottom: 2rem;
      font-family: var(--font-heading);
    }

    .test-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--dark-900);
      border-radius: var(--radius-lg);
    }

    h3 {
      color: var(--dark-100);
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }

    .test-btn {
      padding: 0.75rem 2rem;
      background: linear-gradient(135deg, #5227ff 0%, #7047ff 100%);
      border: 1px solid rgba(82, 39, 255, 0.5);
      border-radius: var(--radius-lg);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .test-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(82, 39, 255, 0.4);
    }

    .test-btn.secondary {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      border-color: var(--dark-600);
    }

    .status {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: var(--radius-md);
      font-weight: 500;
    }

    .status.loading {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .result {
      margin-top: 1rem;
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      border: 2px solid;
    }

    .result.success {
      background: rgba(34, 197, 94, 0.1);
      border-color: rgba(34, 197, 94, 0.3);
      color: #22c55e;
    }

    .result.error {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.3);
      color: #ef4444;
    }

    .result h3 {
      margin-top: 0;
      color: inherit;
    }

    .result p {
      margin: 0.5rem 0;
      color: var(--dark-200);
    }

    .result strong {
      color: var(--dark-100);
    }

    .components-list, .troubleshooting {
      margin-top: 1rem;
      padding: 1rem;
      background: var(--dark-800);
      border-radius: var(--radius-md);
    }

    .components-list h4, .troubleshooting h4 {
      color: var(--dark-100);
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      color: var(--dark-300);
    }

    li {
      margin: 0.25rem 0;
    }

    code {
      background: var(--dark-900);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: var(--primary-400);
    }
  `]
})
export class TestConnectionComponent {
  private http = inject(HttpClient);
  
  apiUrl = environment.apiUrl;
  loading = signal(false);
  result = signal<any>(null);
  error = signal<string | null>(null);
  categorias = signal<any[] | null>(null);

  testConnection(): void {
    this.loading.set(true);
    this.result.set(null);
    this.error.set(null);

    this.http.get(`${this.apiUrl}/components`).subscribe({
      next: (data: any) => {
        this.loading.set(false);
        this.result.set({
          status: 'OK',
          data: data
        });
        console.log('✅ Conexión exitosa:', data);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message || 'Error desconocido');
        console.error('❌ Error de conexión:', err);
      }
    });
  }

  testCategorias(): void {
    this.http.get(`${this.apiUrl}/categorias`).subscribe({
      next: (data: any) => {
        this.categorias.set(data);
        console.log('✅ Categorías:', data);
      },
      error: (err) => {
        console.error('❌ Error al obtener categorías:', err);
      }
    });
  }
}
