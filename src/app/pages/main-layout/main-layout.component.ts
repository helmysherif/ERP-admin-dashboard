import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SharedService } from '../../shared/services/shared.service';
import { DrawerModule } from 'primeng/drawer';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    DrawerModule,
    RouterModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  currentTheme: 'light' | 'dark' = 'light';
  currentLanguage: 'ar' | 'en' = 'en';
  private sharedService = inject(SharedService);
  isSidebarOpen = false;
  visibleSidebar = false;
  private translationService = inject(TranslationService);
  ngOnInit() {
    // console.log(window.innerWidth);
    this.translationService.currentLanguage.subscribe((lang: 'ar' | 'en') => {
      this.currentLanguage = lang;
    });
    this.translationService.currentTheme.subscribe(
      (theme: 'light' | 'dark') => {
        this.currentTheme = theme;
      },
    );
    this.sharedService.isSidebarOpen.subscribe((isOpen: boolean) => {
      this.isSidebarOpen = isOpen;
    });
    this.sharedService.isDrawerOpen.subscribe((isOpen: boolean) => {
      this.visibleSidebar = isOpen;
    });
  }
  switchLanguage(language: 'ar' | 'en') {
    this.translationService.switchLanguage(language);
  }
  changeTheming() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.translationService.switchTheme(newTheme);
    this.currentTheme = newTheme;
  }
}
