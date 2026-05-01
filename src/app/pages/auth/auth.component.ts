import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from '../../components/services/translation.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  currentLanguage: 'ar' | 'en' = 'ar';
  currentTheme: 'light' | 'dark' = 'light';
  private translationService = inject(TranslationService);
  ngOnInit() {
    this.translationService.currentLanguage.subscribe((lang: 'ar' | 'en') => {
      this.currentLanguage = lang;
    });
    this.translationService.currentTheme.subscribe(
      (theme: 'light' | 'dark') => {
        this.currentTheme = theme;
      },
    );
  }
  switchLanguage(language: 'ar' | 'en') {
    this.translationService.switchLanguage(language);
  }
  changeTheming() {
    // this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.translationService.switchTheme(newTheme);
    this.currentTheme = newTheme;
  }
}
