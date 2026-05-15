import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { TranslationService } from './components/services/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin-dashboard';
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);
  private spinner = inject(NgxSpinnerService);
  private translationService = inject(TranslationService);
  constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('en');
    this.translationService.initLanguage();
    // this.translate.use('en');
    // this.document.documentElement.dir = 'ltr';
    this.translationService.initTheme();
    this.spinner.hide();
  }
}
