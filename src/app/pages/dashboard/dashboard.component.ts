import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { TranslationService } from '../../shared/services/translation.service';
import {
  BestSellerProduct,
  ChartLegend,
  DunatChartData,
  FilterOption,
  Order,
  RevenueData,
  StatisticsData,
  TopSeller,
} from '../../shared/interfaces/dashboard';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { DashboardService } from '../../shared/services/dashboard.service';
import { MillionPipe } from '../../shared/pipes/million.pipe';
import { ColumnLineMixChartComponent } from '../../components/column-line-mix-chart/column-line-mix-chart.component';
import { EarthMapComponent } from '../../components/earth-map/earth-map.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PaginatorPipe } from '../../shared/pipes/paginator.pipe';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
@Component({
  selector: 'app-dashboard',
  imports: [
    TranslatePipe,
    DatePickerModule,
    FormsModule,
    StatisticCardComponent,
    MillionPipe,
    ColumnLineMixChartComponent,
    EarthMapComponent,
    DatePipe,
    CurrencyPipe,
    PaginatorModule,
    PaginatorPipe,
    DonutChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  rangeDates: Date[] | undefined;
  currentLanguage: 'ar' | 'en' = 'en';
  currentTheme: 'light' | 'dark' = 'light';
  private dashboardService = inject(DashboardService);
  statisticsData: StatisticsData[] = [];
  revenueData: RevenueData[] = [];
  isDateDropdownOpen = signal(false);
  isReportDropdownOpen = signal(false);
  isReportDropdownOpen2 = signal(false);
  @ViewChild('DateFilterDropdown') DateFilterDropdown!: ElementRef;
  @ViewChild('ReportDropdown') ReportDropdown!: ElementRef;
  @ViewChild('ReportDropdown2') ReportDropdown2!: ElementRef;
  revenueChartLegends: ChartLegend[] = [];
  selectedDateFilter!: { englisthName: string; arabicName: string };
  selectedReportOption!: { englisthName: string; arabicName: string };
  selectedReportOption2!: { englisthName: string; arabicName: string };
  private translationService = inject(TranslationService);
  dateFilterOptions: FilterOption[] = [];
  reportFilterOptions: FilterOption[] = [];
  bestSellerProducts: BestSellerProduct[] = [];
  topSellers: TopSeller[] = [];
  recentOrders: Order[] = [];
  dunatChartData: DunatChartData[] = [
    {
      englishName: 'Direct',
      arabicName: 'المباشر',
      value: 44,
      color: '#405189',
    },
    {
      englishName: 'Referral',
      arabicName: 'الإحالة',
      value: 55,
      color: '#0AB39C',
    },
    {
      englishName: 'Social',
      arabicName: 'الاجتماعي',
      value: 41,
      color: '#F7B84B',
    },
    {
      englishName: 'Email',
      arabicName: 'البريد الإلكتروني',
      value: 17,
      color: '#F06548',
    },
    { englishName: 'Other', arabicName: 'أخرى', value: 15, color: '#299CDB' },
  ];
  first = 0;
  rows = 5;
  first2 = 0;
  rows2 = 5;
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
  }
  onTopSellerChange(event: PaginatorState) {
    this.first2 = event.first ?? 0;
    this.rows2 = event.rows ?? 5;
  }
  ngOnInit() {
    this.translationService.currentLanguage.subscribe((lang: 'ar' | 'en') => {
      this.currentLanguage = lang;
    });
    this.revenueData = this.dashboardService.getRevenueData();
    this.rangeDates = [new Date('2026-05-01'), new Date('2026-05-10')];
    this.statisticsData = this.dashboardService.getStatisticsData();
    this.revenueChartLegends = [
      { englishName: 'Orders', arabicName: 'الطلبات' },
      { englishName: 'Earnings', arabicName: 'الأرباح' },
      { englishName: 'Refunds', arabicName: 'المبالغ المستردة' },
    ];
    this.translationService.currentTheme.subscribe(
      (theme: 'light' | 'dark') => {
        this.currentTheme = theme;
      },
    );
    this.dateFilterOptions = this.dashboardService.getDateFilterOptions();
    this.reportFilterOptions = this.dashboardService.getReportFilterOptions();
    this.bestSellerProducts = this.dashboardService.getBestSellerProducts();
    this.topSellers = this.dashboardService.getTopSellers();
    this.recentOrders = this.dashboardService.getRecentOrders();
    this.selectedDateFilter = this.dateFilterOptions[0];
    this.selectedReportOption = this.reportFilterOptions[0];
    this.selectedReportOption2 = this.reportFilterOptions[0];
  }
  changeSelectedDate(option: { englisthName: string; arabicName: string }) {
    this.selectedDateFilter = option;
    this.isDateDropdownOpen.set(false);
  }
  changeSelectedReportOption(option: {
    englisthName: string;
    arabicName: string;
  }) {
    this.selectedReportOption = option;
    this.isReportDropdownOpen.set(false);
  }
  changeSelectedReportOption2(option: {
    englisthName: string;
    arabicName: string;
  }) {
    this.selectedReportOption2 = option;
    this.isReportDropdownOpen2.set(false);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.DateFilterDropdown) {
      const clickedInsideDropdown =
        this.DateFilterDropdown.nativeElement.contains(event.target);
      if (!clickedInsideDropdown) {
        this.isDateDropdownOpen.set(false);
      }
    }
    if (this.ReportDropdown) {
      const clickedInsideReportDropdown =
        this.ReportDropdown.nativeElement.contains(event.target);
      if (!clickedInsideReportDropdown) {
        this.isReportDropdownOpen.set(false);
      }
    }
    if (this.ReportDropdown2) {
      const clickedInsideReportDropdown2 =
        this.ReportDropdown2.nativeElement.contains(event.target);
      if (!clickedInsideReportDropdown2) {
        this.isReportDropdownOpen2.set(false);
      }
    }
  }
  toggleUserDropdown() {
    this.isDateDropdownOpen.update((prev) => !prev);
  }
  toggleReportDropdown() {
    this.isReportDropdownOpen.update((prev) => !prev);
  }
  toggleReportDropdown2() {
    this.isReportDropdownOpen2.update((prev) => !prev);
  }
}
