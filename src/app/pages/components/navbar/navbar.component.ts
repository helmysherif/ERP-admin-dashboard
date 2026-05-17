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
import { TabsModule } from 'primeng/tabs';
import { SharedService } from '../../../components/services/shared.service';
import { TranslationService } from '../../../components/services/translation.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
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
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
interface Notification {
  id: number;
  image: string;
  text: string;
  date: Date;
  imageType: 'icon' | 'avatar';
  username?: string;
}
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslatePipe, TabsModule, RouterLink],
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
  isFullScreen = false;
  isLangDropdownOpen = signal(false);
  isCartDropdownOpen = signal(false);
  isSearchDropdownOpen = signal(false);
  isNotificationsDropdownOpen = signal(false);
  isUserDropdownOpen = signal(false);
  @ViewChild('langDropdown') langDropdown!: ElementRef;
  @ViewChild('cartDropdown') cartDropdown!: ElementRef;
  @ViewChild('searchDropdown') searchDropdown!: ElementRef;
  @ViewChild('notificationsDropdown') notificationsDropdown!: ElementRef;
  @ViewChild('userDropdown') userDropdown!: ElementRef;
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
  notifications: Notification[] = [
    {
      id: 1,
      image: 'ri-verified-badge-line',
      text: '<b>Elite</b>Your  author Graphic Optimization <span class="text-secondary">reward</span> is ready!',
      date: new Date('2023-06-01T10:30:00'),
      imageType: 'icon',
    },
    {
      id: 2,
      image: 'images/img1.jpg',
      text: "Answered to your comment on the cash flow forecast's graph 🔔.",
      date: new Date('2025-03-15T10:30:00'),
      imageType: 'avatar',
      username: 'Angela Bernier',
    },
    {
      id: 3,
      image: 'ri-message-2-line',
      text: 'You have received <b class="text-success">20</b> new messages in the conversation',
      date: new Date('2025-07-05T10:30:00'),
      imageType: 'icon',
    },
    {
      id: 4,
      image: 'images/img2.jpg',
      text: '<b>Jacob Jones</b> mentioned you in a comment: <span class="text-secondary">"The new dashboard design looks great!"</span>',
      date: new Date('2025-08-20T10:30:00'),
      imageType: 'avatar',
      username: 'Jacob Jones',
    },
  ];
  UsersNotifications: Notification[] = [
    {
      id: 1,
      image: 'images/img1.jpg',
      text: "Answered to your comment on the cash flow forecast's graph 🔔.",
      date: new Date('2025-03-15T10:30:00'),
      imageType: 'avatar',
      username: 'Angela Bernier',
    },
    {
      id: 2,
      image: 'images/img2.jpg',
      text: '<b>Jacob Jones</b> mentioned you in a comment: <span class="text-secondary">"The new dashboard design looks great!"</span>',
      date: new Date('2025-08-20T10:30:00'),
      imageType: 'avatar',
      username: 'Jacob Jones',
    },
  ];
  // make function to convert date to time ago format
  timeAgo(date: Date) {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minutes ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hours ago`;
    } else if (secondsAgo < 2592000) {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} days ago`;
    } else if (secondsAgo < 31536000) {
      const monthsAgo = Math.floor(secondsAgo / 2592000);
      return `${monthsAgo} months ago`;
    } else {
      const yearsAgo = Math.floor(secondsAgo / 31536000);
      return `${yearsAgo} years ago`;
    }
  }
  toggleLangDropdown() {
    this.isLangDropdownOpen.update((prev) => !prev);
  }
  toggleUserDropdown() {
    this.isUserDropdownOpen.update((prev) => !prev);
  }
  toggleCartDropdown() {
    this.isCartDropdownOpen.update((prev) => !prev);
  }
  toggleNotificationsDropdown() {
    this.isNotificationsDropdownOpen.update((prev) => !prev);
  }
  toggleSearchDropdown() {
    this.isSearchDropdownOpen.update((prev) => !prev);
  }
  @HostListener('document:fullscreenchange')
  onFullscreenChange() {
    this.isFullScreen = !!document.fullscreenElement;
  }
  toggleFullScreen() {
    if (!this.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
    this.isFullScreen = !this.isFullScreen;
  }
  removeCartItem(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  }
  get totalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
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
    if (this.notificationsDropdown) {
      const clickedInsideNotificationsDropdown =
        this.notificationsDropdown.nativeElement.contains(event.target);
      if (!clickedInsideNotificationsDropdown) {
        this.isNotificationsDropdownOpen.set(false);
      }
    }
    if (this.userDropdown) {
      const clickedInsideUserDropdown =
        this.userDropdown.nativeElement.contains(event.target);
      if (!clickedInsideUserDropdown) {
        this.isUserDropdownOpen.set(false);
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
