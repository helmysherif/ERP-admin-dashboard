import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../components/services/translation.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, TranslatePipe, SelectModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  currentTheme: 'light' | 'dark' = 'light';
  private translationService = inject(TranslationService);
  selectedOptionIndex: number = 0;
  currentLanguage: 'ar' | 'en' = 'ar';
  showDropdown: boolean = false;
  @ViewChild('optionsContainer') optionsContainer!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.showDropdown) return;

    const clickedInsideOptions = this.optionsContainer?.nativeElement.contains(
      event.target,
    );

    if (!clickedInsideOptions) {
      this.showDropdown = false;
    }
  }
  countries: {
    ArabicName: string;
    EnglishName: string;
    iso: string;
    dialCode: string;
    flagUrl: string;
  }[] = [
    {
      ArabicName: 'مصر',
      EnglishName: 'Egypt',
      iso: 'EG',
      dialCode: '+20',
      flagUrl: 'https://flagcdn.com/w40/eg.png',
    },
    {
      ArabicName: 'الولايات المتحدة',
      EnglishName: 'United States',
      iso: 'US',
      dialCode: '+1',
      flagUrl: 'https://flagcdn.com/w40/us.png',
    },
    {
      ArabicName: 'المملكة المتحدة',
      EnglishName: 'United Kingdom',
      iso: 'GB',
      dialCode: '+44',
      flagUrl: 'https://flagcdn.com/w40/gb.png',
    },
    {
      ArabicName: 'كندا',
      EnglishName: 'Canada',
      iso: 'CA',
      dialCode: '+1',
      flagUrl: 'https://flagcdn.com/w40/ca.png',
    },
    {
      ArabicName: 'أستراليا',
      EnglishName: 'Australia',
      iso: 'AU',
      dialCode: '+61',
      flagUrl: 'https://flagcdn.com/w40/au.png',
    },
    {
      ArabicName: 'ألمانيا',
      EnglishName: 'Germany',
      iso: 'DE',
      dialCode: '+49',
      flagUrl: 'https://flagcdn.com/w40/de.png',
    },
    {
      ArabicName: 'فرنسا',
      EnglishName: 'France',
      iso: 'FR',
      dialCode: '+33',
      flagUrl: 'https://flagcdn.com/w40/fr.png',
    },
  ];
  filteredCountriesList = [...this.countries];
  selectedCountry!: {
    ArabicName: string;
    EnglishName: string;
    iso: string;
    dialCode: string;
    flagUrl: string;
  };
  ngOnInit() {
    this.translationService.currentTheme.subscribe(
      (theme: 'light' | 'dark') => {
        this.currentTheme = theme;
      },
    );
    this.translationService.currentLanguage.subscribe((lang: 'ar' | 'en') => {
      this.currentLanguage = lang;
    });
    this.selectedCountry = this.countries[0];
  }
  showCodeDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }
  changeSelectedCountry(
    country: {
      ArabicName: string;
      EnglishName: string;
      iso: string;
      dialCode: string;
      flagUrl: string;
    },
    index: number,
  ) {
    this.selectedCountry = country;
    this.showDropdown = false;
    this.selectedOptionIndex = index;
  }
  filterInOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredCountriesList = [...this.countries];
      return;
    }

    // Always filter from the original 'countries' array
    this.filteredCountriesList = this.countries.filter((country) => {
      const nameToSearch =
        this.currentLanguage === 'ar'
          ? country.ArabicName
          : country.EnglishName;

      return nameToSearch.toLowerCase().includes(searchTerm);
    });
  }
}
