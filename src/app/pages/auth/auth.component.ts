import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  currentLanguage: 'ar' | 'en' = 'en';
  currentTheme: 'light' | 'dark' = 'light';
  private translationService = inject(TranslationService);
  authSliderTexts: { arabicTitle: string; englishTitle: string }[] = [
    {
      englishTitle:
        '"The theme is really great with an amazing customer support."',
      arabicTitle: '"الثيم رائع حقًا مع دعم عملاء مذهل."',
    },
    {
      englishTitle:
        '" Great! Clean code, clean design, easy for customization. Thanks very much!"',
      arabicTitle: '"رائع! كود نظيف، تصميم نظيف، سهل التخصيص. شكرًا جزيلاً!"',
    },
    {
      englishTitle:
        '"I am really satisfied with the theme and the support team is very responsive."',
      arabicTitle: '"أنا راضٍ حقًا عن الثيم وفريق الدعم سريع الاستجابة جدًا."',
    },
  ];
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
