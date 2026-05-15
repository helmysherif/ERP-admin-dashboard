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
  private elementRef = inject(ElementRef);
  @ViewChild('langDropdown') langDropdown!: ElementRef;
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
  toggleLangDropdown() {
    this.isLangDropdownOpen.update((prev) => !prev);
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
