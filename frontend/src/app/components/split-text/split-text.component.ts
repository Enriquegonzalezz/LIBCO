import { Component, Input, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-split-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="'split-parent ' + className" [style.text-align]="textAlign">
      {{ text }}
    </span>
  `,
  styles: [`
    .split-parent {
      display: inline-block;
      overflow: hidden;
      white-space: normal;
      word-wrap: break-word;
    }

    .split-char, .split-word, .split-line {
      display: inline-block;
      will-change: transform, opacity;
    }
  `]
})
export class SplitTextComponent implements AfterViewInit, OnDestroy {
  @Input() text: string = '';
  @Input() className: string = '';
  @Input() delay: number = 50;
  @Input() duration: number = 1.25;
  @Input() ease: string = 'power3.out';
  @Input() splitType: 'chars' | 'words' | 'lines' = 'chars';
  @Input() fromY: number = 40;
  @Input() fromOpacity: number = 0;
  @Input() threshold: number = 0.1;
  @Input() rootMargin: string = '-100px';
  @Input() textAlign: string = 'left';

  private animation?: gsap.core.Tween;
  private scrollTrigger?: ScrollTrigger;
  fontsLoaded = signal(false);

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Esperar a que las fuentes carguen
    if (document.fonts.status === 'loaded') {
      this.fontsLoaded.set(true);
      this.initAnimation();
    } else {
      document.fonts.ready.then(() => {
        this.fontsLoaded.set(true);
        this.initAnimation();
      });
    }
  }

  private initAnimation(): void {
    const element = this.el.nativeElement.querySelector('.split-parent');
    if (!element || !this.text) return;

    // Split text manualmente
    const chars = this.splitText(element);
    
    // Configurar ScrollTrigger
    const startPct = (1 - this.threshold) * 100;
    const start = `top ${startPct}%${this.rootMargin}`;

    // Animar caracteres
    this.animation = gsap.fromTo(
      chars,
      {
        opacity: this.fromOpacity,
        y: this.fromY
      },
      {
        opacity: 1,
        y: 0,
        duration: this.duration,
        ease: this.ease,
        stagger: this.delay / 1000,
        scrollTrigger: {
          trigger: element,
          start: start,
          once: true
        }
      }
    );
  }

  private splitText(element: HTMLElement): HTMLElement[] {
    const text = element.textContent || '';
    element.innerHTML = '';

    const chars: HTMLElement[] = [];

    if (this.splitType === 'chars') {
      // Split por caracteres
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        element.appendChild(span);
        chars.push(span);
      }
    } else if (this.splitType === 'words') {
      // Split por palabras
      const words = text.split(' ');
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = word;
        span.style.display = 'inline-block';
        element.appendChild(span);
        chars.push(span);
        
        if (index < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
      });
    } else if (this.splitType === 'lines') {
      // Split por líneas (simplificado)
      const span = document.createElement('span');
      span.className = 'split-line';
      span.textContent = text;
      span.style.display = 'inline-block';
      element.appendChild(span);
      chars.push(span);
    }

    return chars;
  }

  ngOnDestroy(): void {
    if (this.animation) {
      this.animation.kill();
    }
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
  }
}
