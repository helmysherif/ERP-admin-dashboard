import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { TranslationService } from '../../shared/services/translation.service';
import {
  ChartLegend,
  RevenueData,
  StatisticsData,
} from '../../shared/interfaces/dashboard';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { DashboardService } from '../../shared/services/dashboard.service';
import { MillionPipe } from '../../shared/pipes/million.pipe';
import { ColumnLineMixChartComponent } from '../../components/column-line-mix-chart/column-line-mix-chart.component';
import { EarthMapComponent } from '../../components/earth-map/earth-map.component';
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
  revenueChartLegends: ChartLegend[] = [];
  private translationService = inject(TranslationService);
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
  }
}
