import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  @Input() appCountUp: number = 0;
  @Input() duration: number = 2000;
  @Input() isCurrency: boolean = false;
  @Input() suffix: string = '';
  private platformId = inject(PLATFORM_ID);
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let initialValue = '0';

      if (this.isCurrency) {
        initialValue = '0';
      }

      initialValue += this.suffix;

      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        initialValue,
      );
      this.startCounting();
    }
  }
  startCounting() {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1);
      const currentValue = Math.floor(progress * this.appCountUp);
      let displayedValue = currentValue.toString();
      if (this.isCurrency) {
        if (currentValue >= 1_000_000) {
          displayedValue = (currentValue / 1_000_000).toFixed(1) + 'M';
        } else if (currentValue >= 1_000) {
          displayedValue = (currentValue / 1_000).toFixed(1) + 'K';
        } else {
          displayedValue = currentValue.toString();
        }
        // displayedValue = '$' + currentValue.toLocaleString();
      }
      displayedValue += this.suffix;
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        displayedValue,
      );
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
}
