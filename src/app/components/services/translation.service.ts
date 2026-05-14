import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
type Lang = 'ar' | 'en';
type Theme = 'light' | 'dark';
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentLanguage: BehaviorSubject<Lang> = new BehaviorSubject<Lang>('en');
  currentTheme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('light');
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  constructor() {
    this.initLanguage();
    this.initTheme();
  }
  private initLanguage() {
    if (!this.isBrowser) return;
    const savedLang = (localStorage.getItem('lang') as Lang) || 'en';
    this.setLanguage(savedLang);
    this.currentLanguage.next(savedLang);
  }
  setLanguage(lang: Lang) {
    this.translate.use(lang);
    if (this.isBrowser) {
      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('lang', lang);
    }
  }
  switchLanguage(lang: Lang) {
    this.currentLanguage.next(lang);
    this.setLanguage(lang);
  }
  private initTheme() {
    if (!this.isBrowser) return;
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    this.setTheme(savedTheme);
    this.currentTheme.next(savedTheme);
  }

  setTheme(theme: Theme) {
    if (!this.isBrowser) return;
    this.document.body.className = theme;
    localStorage.setItem('theme', theme);
  }

  switchTheme(theme: Theme) {
    this.currentTheme.next(theme);
    this.setTheme(theme);
  }
}
