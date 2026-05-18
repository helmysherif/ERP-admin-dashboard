import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-earth-map',
  imports: [],
  templateUrl: './earth-map.component.html',
  styleUrl: './earth-map.component.scss',
})
export class EarthMapComponent {
  currentTheme: InputSignal<'light' | 'dark'> = input.required<
    'light' | 'dark'
  >();
  currentLang: InputSignal<'en' | 'ar'> = input.required<'en' | 'ar'>();
}
