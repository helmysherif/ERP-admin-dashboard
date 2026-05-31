import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../shared/services/translation.service';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '../../components/slider/slider.component';
import { AccordionModule } from 'primeng/accordion';
// import { CountUpDirective } from '../../shared/directives/count-up.directive';
@Component({
  selector: 'app-products',
  imports: [
    TranslateModule,
    RouterLink,
    CommonModule,
    ChipModule,
    FormsModule,
    SliderComponent,
    AccordionModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  currentLanguage: 'ar' | 'en' = 'en';
  activeProfuctTypeId!: number | null;
  rangeValues: number[] = [0, 2000];
  changedPriceRange: number[] = [];
  minPrice = 0;
  maxPrice = 2000;
  minimumGap = 100;
  private translationService = inject(TranslationService);
  allCategories = [
    { id: 1, name: 'T-shirts' },
    { id: 2, name: 'Shirts' },
    { id: 3, name: 'Jeans' },
    { id: 4, name: 'Jackets' },
    { id: 5, name: 'Sweaters' },
    { id: 6, name: 'Dresses' },
    { id: 7, name: 'Skirts' },
    { id: 8, name: 'Shorts' },
    { id: 9, name: 'Suits' },
    { id: 10, name: 'Coats' },
  ];
  clothesCategories = [...this.allCategories];
  productsTypes = [
    { id: 1, name: 'grocery', count: 120 },
    { id: 2, name: 'fashion', count: 5 },
    { id: 3, name: 'watches', count: 7 },
    { id: 4, name: 'electronics', count: 10 },
    { id: 5, name: 'furniture', count: 12 },
    { id: 6, name: 'automotive accessories', count: 20 },
    { id: 7, name: 'appliances', count: 15 },
    { id: 8, name: 'kids', count: 8 },
  ];
  ngOnInit() {
    this.translationService.currentLanguage.subscribe((lang: 'ar' | 'en') => {
      this.currentLanguage = lang;
    });
    this.changedPriceRange = [...this.rangeValues];
  }
  removeCategory(categoryId: number) {
    if (this.clothesCategories.length <= 1) {
      return;
    }
    this.clothesCategories = this.clothesCategories.filter(
      (item) => item.id !== categoryId,
    );
  }
  clearAllFilters() {
    this.clothesCategories = [...this.allCategories];
    this.activeProfuctTypeId = null;
    this.rangeValues = [0, 2000];
    this.minPrice = 0;
    this.maxPrice = 2000;
  }
  toggleProductType(productTypeId: number) {
    this.activeProfuctTypeId = productTypeId;
  }
  updateMinPrice(newMin: number) {
    // console.log('Updating min price to:', newMin);
  }
  updateMaxPrice(newMax: number) {
    // console.log('Updating max price to:', newMax);
  }
}
