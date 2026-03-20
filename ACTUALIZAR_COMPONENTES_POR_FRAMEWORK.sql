-- ============================================
-- ACTUALIZAR TABLA COMPONENTES CON FRAMEWORK
-- ============================================

-- Primero, agregar las nuevas columnas si no existen
ALTER TABLE componentes 
ADD COLUMN IF NOT EXISTS framework VARCHAR(50) DEFAULT 'Angular',
ADD COLUMN IF NOT EXISTS is_ui_component BOOLEAN DEFAULT true;

-- ============================================
-- ACTUALIZAR COMPONENTES EXISTENTES
-- ============================================

-- Limpiar datos existentes
DELETE FROM componentes;
DELETE FROM categorias;

-- ============================================
-- INSERTAR CATEGORÍAS POR FRAMEWORK
-- ============================================

INSERT INTO categorias (id, nombre) VALUES 
  ('2024-01-01T00:00:00+00:00', 'Angular'),
  ('2024-01-02T00:00:00+00:00', 'Next.js'),
  ('2024-01-03T00:00:00+00:00', 'Vue'),
  ('2024-01-04T00:00:00+00:00', 'HTML/CSS'),
  ('2024-01-05T00:00:00+00:00', 'React')
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERTAR COMPONENTES ANGULAR (UI)
-- ============================================

INSERT INTO componentes (id, nombre, descripcion, codigo_ejemplo, categoria_id, framework, is_ui_component) VALUES 
  ('2024-01-10T10:00:00+00:00', 'Input', 'Componente de entrada de texto reutilizable', 
   'import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [FormsModule],
  template: `
    <input 
      type="text" 
      [(ngModel)]="value" 
      placeholder="Ingresa texto..."
      class="input-field"
    />
  `,
  styles: [`
    .input-field {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
  `]
})
export class InputComponent {
  value: string = "";
}', '2024-01-01T00:00:00+00:00', 'Angular', true),

  ('2024-01-11T10:00:00+00:00', 'Button', 'Botón reutilizable con variantes', 
   'import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  template: `
    <button [class]="variant" (click)="onClick()">
      {{ label }}
    </button>
  `,
  styles: [`
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }
    .primary {
      background-color: #5227ff;
      color: white;
    }
    .secondary {
      background-color: #f0f0f0;
      color: #333;
    }
  `]
})
export class ButtonComponent {
  @Input() label: string = "Click me";
  @Input() variant: string = "primary";
  
  onClick() {
    console.log("Button clicked");
  }
}', '2024-01-01T00:00:00+00:00', 'Angular', true),

  ('2024-01-12T10:00:00+00:00', 'Radio', 'Componente de radio button', 
   'import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-radio",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="radio-group">
      <label *ngFor="let option of options">
        <input 
          type="radio" 
          [value]="option.value" 
          [(ngModel)]="selected"
          name="radio-group"
        />
        {{ option.label }}
      </label>
    </div>
  `,
  styles: [`
    .radio-group {
      display: flex;
      gap: 16px;
    }
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
  `]
})
export class RadioComponent {
  @Input() options: any[] = [];
  selected: any = null;
}', '2024-01-01T00:00:00+00:00', 'Angular', true),

  ('2024-01-13T10:00:00+00:00', 'Card', 'Componente de tarjeta reutilizable', 
   'import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div class="card">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
    }
    .card-description {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class CardComponent {
  @Input() title: string = "";
  @Input() description: string = "";
}', '2024-01-01T00:00:00+00:00', 'Angular', true);

-- ============================================
-- INSERTAR COMPONENTES NEXT.JS (UI)
-- ============================================

INSERT INTO componentes (id, nombre, descripcion, codigo_ejemplo, categoria_id, framework, is_ui_component) VALUES 
  ('2024-01-20T10:00:00+00:00', 'Input', 'Input component para Next.js', 
   '"use client";

import { useState } from "react";

export default function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Ingresa texto..."
      className="px-3 py-2 border border-gray-300 rounded-md"
    />
  );
}', '2024-01-02T00:00:00+00:00', 'Next.js', true),

  ('2024-01-21T10:00:00+00:00', 'Button', 'Button component para Next.js', 
   '"use client";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function Button({ label, variant = "primary", onClick }: ButtonProps) {
  const baseStyles = "px-5 py-2 rounded-md font-semibold cursor-pointer";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
}', '2024-01-02T00:00:00+00:00', 'Next.js', true),

  ('2024-01-22T10:00:00+00:00', 'Card', 'Card component para Next.js', 
   '"use client";

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function Card({ title, description, children }: CardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      {children}
    </div>
  );
}', '2024-01-02T00:00:00+00:00', 'Next.js', true);

-- ============================================
-- INSERTAR COMPONENTES VUE (UI)
-- ============================================

INSERT INTO componentes (id, nombre, descripcion, codigo_ejemplo, categoria_id, framework, is_ui_component) VALUES 
  ('2024-01-30T10:00:00+00:00', 'Input', 'Input component para Vue', 
   '<template>
  <input
    v-model="value"
    type="text"
    placeholder="Ingresa texto..."
    class="px-3 py-2 border border-gray-300 rounded-md"
  />
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>', '2024-01-03T00:00:00+00:00', 'Vue', true),

  ('2024-01-31T10:00:00+00:00', 'Button', 'Button component para Vue', 
   '<template>
  <button
    :class="[baseStyles, variants[variant]]"
    @click="$emit(''click'')"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: String,
  variant: {
    type: String,
    default: "primary",
  },
});

const baseStyles = "px-5 py-2 rounded-md font-semibold cursor-pointer";
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};
</script>', '2024-01-03T00:00:00+00:00', 'Vue', true),

  ('2024-02-01T10:00:00+00:00', 'Card', 'Card component para Vue', 
   '<template>
  <div class="border border-gray-200 rounded-lg p-4 shadow-sm">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600 text-sm mb-4">{{ description }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
});
</script>', '2024-01-03T00:00:00+00:00', 'Vue', true);

-- ============================================
-- INSERTAR COMPONENTES HTML/CSS (UI)
-- ============================================

INSERT INTO componentes (id, nombre, descripcion, codigo_ejemplo, categoria_id, framework, is_ui_component) VALUES 
  ('2024-02-10T10:00:00+00:00', 'Input', 'Input HTML puro', 
   '<input
  type="text"
  placeholder="Ingresa texto..."
  style="
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    max-width: 300px;
  "
/>', '2024-01-04T00:00:00+00:00', 'HTML/CSS', true),

  ('2024-02-11T10:00:00+00:00', 'Button', 'Button HTML puro', 
   '<button
  style="
    padding: 10px 20px;
    background-color: #5227ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
  "
>
  Click me
</button>', '2024-01-04T00:00:00+00:00', 'HTML/CSS', true),

  ('2024-02-12T10:00:00+00:00', 'Card', 'Card HTML puro', 
   '<div
  style="
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    max-width: 400px;
  "
>
  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
    Título
  </h3>
  <p style="margin: 0; color: #666; font-size: 14px;">
    Descripción de la tarjeta
  </p>
</div>', '2024-01-04T00:00:00+00:00', 'HTML/CSS', true);

-- ============================================
-- VERIFICAR DATOS
-- ============================================

SELECT 'CATEGORÍAS' as tipo, COUNT(*) as total FROM categorias
UNION ALL
SELECT 'COMPONENTES', COUNT(*) FROM componentes
UNION ALL
SELECT 'COMPONENTES ANGULAR', COUNT(*) FROM componentes WHERE framework = 'Angular'
UNION ALL
SELECT 'COMPONENTES NEXT.JS', COUNT(*) FROM componentes WHERE framework = 'Next.js'
UNION ALL
SELECT 'COMPONENTES VUE', COUNT(*) FROM componentes WHERE framework = 'Vue'
UNION ALL
SELECT 'COMPONENTES HTML/CSS', COUNT(*) FROM componentes WHERE framework = 'HTML/CSS';
