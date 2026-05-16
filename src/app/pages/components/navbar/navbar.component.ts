import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  signal,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../../../components/services/shared.service';
import { TranslationService } from '../../../components/services/translation.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
interface Language {
  arabicName: string;
  englishName: string;
  flag: string;
}
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isOpened = false;
  showDrawer = false;
  currentTheme: 'light' | 'dark' = 'light';
  isSidebarOpen2: InputSignal<boolean> = input.required<boolean>();
  currentLanguage: InputSignal<'en' | 'ar'> = input.required<'en' | 'ar'>();
  private sharedService = inject(SharedService);
  currentLang!: Language;
  isLangDropdownOpen = signal(false);
  isCartDropdownOpen = signal(false);
  isSearchDropdownOpen = signal(false);
  @ViewChild('langDropdown') langDropdown!: ElementRef;
  @ViewChild('cartDropdown') cartDropdown!: ElementRef;
  @ViewChild('searchDropdown') searchDropdown!: ElementRef;
  private translationService = inject(TranslationService);
  languages: Language[] = [
    {
      arabicName: 'العربية',
      englishName: 'Arabic',
      flag: 'images/arabic-flag.svg',
    },
    {
      arabicName: 'الإنجليزية',
      englishName: 'English',
      flag: 'images/english-flag.svg',
    },
  ];
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Branded T-Shirts',
      price: 32,
      quantity: 10,
      image: 'images/1.png',
    },
    {
      id: 2,
      name: 'Bentwood Chair',
      price: 18,
      quantity: 5,
      image: 'images/2.png',
    },
    {
      id: 3,
      name: 'Borosel Paper Cup',
      price: 250,
      quantity: 3,
      image: 'images/3.png',
    },
    {
      id: 4,
      name: 'Grey Styled T-shirt',
      price: 1250,
      quantity: 1,
      image: 'images/4.png',
    },
    {
      id: 5,
      name: 'Stillbird Helmet',
      price: 495,
      quantity: 2,
      image: 'images/5.png',
    },
  ];
  toggleLangDropdown() {
    this.isLangDropdownOpen.update((prev) => !prev);
  }
  toggleCartDropdown() {
    this.isCartDropdownOpen.update((prev) => !prev);
  }
  toggleSearchDropdown() {
    this.isSearchDropdownOpen.update((prev) => !prev);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.langDropdown) {
      const clickedInsideDropdown = this.langDropdown.nativeElement.contains(
        event.target,
      );
      if (!clickedInsideDropdown) {
        this.isLangDropdownOpen.set(false);
      }
    }
    if (this.cartDropdown) {
      const clickedInsideCartDropdown =
        this.cartDropdown.nativeElement.contains(event.target);
      if (!clickedInsideCartDropdown) {
        this.isCartDropdownOpen.set(false);
      }
    }
    if (this.searchDropdown) {
      const clickedInsideSearchDropdown =
        this.searchDropdown.nativeElement.contains(event.target);
      if (!clickedInsideSearchDropdown) {
        this.isSearchDropdownOpen.set(false);
      }
    }
  }
  constructor() {
    effect(() => {
      if (this.currentLanguage() === 'en') {
        this.currentLang = this.languages[1];
      } else {
        this.currentLang = this.languages[0];
      }
    });
    this.translationService.currentTheme.subscribe(
      (theme: 'light' | 'dark') => {
        this.currentTheme = theme;
      },
    );
  }
  toggleSidebar() {
    this.isOpened = !this.isOpened;
    this.sharedService.isSidebarOpen.next(this.isOpened);
  }
  toggleSidebarDrawer() {
    this.showDrawer = !this.showDrawer;
    this.sharedService.isDrawerOpen.next(this.showDrawer);
  }
  switchLang(lang: Language) {
    if (lang.englishName === 'English') {
      this.translationService.switchLanguage('en');
    } else {
      this.translationService.switchLanguage('ar');
    }
    this.isLangDropdownOpen.set(false);
  }
  changeTheming() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.translationService.switchTheme(newTheme);
    this.currentTheme = newTheme;
  }
}
