import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SplitTextComponent } from './components/split-text/split-text.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SplitTextComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Component Library');
  private router = inject(Router);

  navigateToAddComponent(): void {
    this.router.navigate(['/add-component']);
  }
}
