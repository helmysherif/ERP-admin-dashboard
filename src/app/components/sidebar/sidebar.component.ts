import { Component, inject, input, InputSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isSidebarOpen = false;
  sharedService = inject(SharedService);
  isDropdownOpen = false;
  currentLanguage: InputSignal<'en' | 'ar'> = input.required<'en' | 'ar'>();
  sidebarLinks = [
    {
      mainTitle: {
        englishLabel: 'menu',
        arabicLabel: 'القائمة',
      },
      subLinks: [
        {
          englishLabel: 'Dashboards',
          arabicLabel: 'لوحة القيادة',
          icon: 'ri-dashboard-2-line',
          route: '/dashboard',
        },
      ],
    },
    {
      mainTitle: {
        englishLabel: 'operations',
        arabicLabel: 'العمليات',
      },
      subLinks: [
        {
          englishLabel: 'Projects',
          arabicLabel: 'المشاريع',
          icon: 'ri-building-line',
          route: '/projects',
        },
        {
          englishLabel: 'Clients',
          arabicLabel: 'العملاء',
          route: '/clients',
          icon: 'ri-user-star-line',
        },
        {
          englishLabel: 'Payment Schedules',
          arabicLabel: 'جداول الدفع',
          route: '/payments',
          icon: 'ri-calendar-todo-line',
        },
        {
          englishLabel: 'Sites Reports',
          arabicLabel: 'تقارير المواقع',
          route: '/sites-reports',
          icon: 'ri-file-list-3-line',
        },
      ],
    },
    {
      mainTitle: {
        englishLabel: 'finance',
        arabicLabel: 'المالية',
      },
      subLinks: [
        {
          englishLabel: 'Expenses',
          arabicLabel: 'المصروفات',
          icon: 'ri-money-dollar-circle-line',
          route: '/expenses',
        },
        {
          englishLabel: 'Revenues',
          arabicLabel: 'الإيرادات',
          route: '/revenues',
          icon: 'ri-hand-coin-line',
        },
        {
          englishLabel: 'Reports',
          arabicLabel: 'التقارير',
          route: '/reports',
          icon: 'ri-bar-chart-box-line',
        },
      ],
    },
    {
      mainTitle: {
        englishLabel: 'hr & vendors',
        arabicLabel: 'الموارد البشرية والموردين',
      },
      subLinks: [
        {
          englishLabel: 'staff',
          arabicLabel: 'الموظفين',
          icon: 'ri-team-line',
          route: '/staff',
        },
      ],
    },
  ];
  ngOnInit() {
    this.sharedService.isSidebarOpen.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }
  showDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
