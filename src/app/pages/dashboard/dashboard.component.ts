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
  FilterOption,
  RevenueData,
  StatisticsData,
} from '../../shared/interfaces/dashboard';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { DashboardService } from '../../shared/services/dashboard.service';
import { MillionPipe } from '../../shared/pipes/million.pipe';
import { ColumnLineMixChartComponent } from '../../components/column-line-mix-chart/column-line-mix-chart.component';
import { EarthMapComponent } from '../../components/earth-map/earth-map.component';
import { DatePipe } from '@angular/common';
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
  @ViewChild('DateFilterDropdown') DateFilterDropdown!: ElementRef;
  @ViewChild('ReportDropdown') ReportDropdown!: ElementRef;
  revenueChartLegends: ChartLegend[] = [];
  selectedDateFilter!: { englisthName: string; arabicName: string };
  selectedReportOption!: { englisthName: string; arabicName: string };
  private translationService = inject(TranslationService);
  dateFilterOptions: FilterOption[] = [];
  reportFilterOptions: FilterOption[] = [];
  bestSellerProducts: BestSellerProduct[] = [];
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
    this.selectedDateFilter = this.dateFilterOptions[0];
    this.selectedReportOption = this.reportFilterOptions[0];
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
  }
  toggleUserDropdown() {
    this.isDateDropdownOpen.update((prev) => !prev);
  }
  toggleReportDropdown() {
    this.isReportDropdownOpen.update((prev) => !prev);
  }
}
