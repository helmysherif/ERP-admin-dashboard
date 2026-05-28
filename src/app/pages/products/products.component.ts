import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../shared/services/translation.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  currentLanguage: 'ar' | 'en' = 'en';
  private translationService = inject(TranslationService);
  ngOnInit() {
    this.translationService.currentLanguage.subscribe((lang: 'ar' | 'en') => {
      this.currentLanguage = lang;
    });
  }
}
