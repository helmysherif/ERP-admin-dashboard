import { Component, input, InputSignal } from '@angular/core';
import { StatisticsData } from '../../shared/interfaces/dashboard';
import { MillionPipe } from '../../shared/pipes/million.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountUpDirective } from '../../shared/directives/count-up.directive';

@Component({
  selector: 'app-statistic-card',
  imports: [RouterModule, CommonModule, CountUpDirective],
  templateUrl: './statistic-card.component.html',
  styleUrl: './statistic-card.component.scss',
})
export class StatisticCardComponent {
  statisticCardData: InputSignal<StatisticsData> =
    input.required<StatisticsData>();
  currentLanguage: InputSignal<'en' | 'ar'> = input.required<'en' | 'ar'>();
  currentTheme: InputSignal<'light' | 'dark'> = input.required<
    'light' | 'dark'
  >();
}
