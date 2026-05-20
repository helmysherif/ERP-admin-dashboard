import { Component, effect, input, InputSignal } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexLegend,
  ApexTooltip,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexGrid,
  ApexAnnotations,
  ApexStates,
  ApexTheme,
  NgApexchartsModule,
} from 'ng-apexcharts';
export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  fill?: ApexFill;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  markers?: ApexMarkers;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  grid?: ApexGrid;
  annotations?: ApexAnnotations;
  states?: ApexStates;
  theme?: ApexTheme;
  colors?: string[];
  labels?: any;
};
import { SharedModule } from '../shared.module';
import { ChartLegend, DunatChartData } from '../../shared/interfaces/dashboard';
@Component({
  selector: 'app-donut-chart',
  imports: [SharedModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
})
export class DonutChartComponent {
  currentTheme: InputSignal<'light' | 'dark'> = input.required<
    'light' | 'dark'
  >();
  currentLang: InputSignal<'en' | 'ar'> = input.required<'en' | 'ar'>();
  chartData: InputSignal<DunatChartData[]> = input.required<DunatChartData[]>();
  labels: string[] = [];
  colors: string[] = [];
  constructor() {
    effect(() => {
      this.labels = this.chartData().map((legend) =>
        this.currentLang() === 'en' ? legend.englishName : legend.arabicName,
      );
      this.colors = this.chartData().map((data) => data.color);
      this.chartOptions.labels =
        this.currentLang() === 'en'
          ? this.labels
          : this.labels.slice().reverse();
      this.chartOptions.series =
        this.currentLang() === 'en'
          ? this.chartData().map((data) => data.value)
          : this.chartData()
              .map((data) => data.value)
              .reverse();
      this.chartOptions.colors =
        this.currentLang() === 'en'
          ? this.colors
          : this.colors.slice().reverse();
      this.chartOptions.legend!.fontSize =
        this.currentLang() === 'en' ? '15px' : '12px';
    });
  }
  public chartOptions: Partial<ChartOptions> = {
    series: [44, 55, 41, 17, 15],
    chart: {
      type: 'donut',
      width: 300,
      height: 300,
      fontFamily: '"Hanken Grotesk", "Cairo", sans-serif',
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
      show: false,
      colors: ['transparent'],
    },
    legend: {
      position: 'bottom',
      fontSize: '15px',
      markers: {
        strokeWidth: 0,
      },
    },
    markers: {
      size: 0,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value, opts) => {
        return opts.w.config.series[opts.seriesIndex];
      },
      style: {
        fontSize: '14px',
        fontWeight: '600',
        colors: ['#fff'],
      },
      dropShadow: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
}
