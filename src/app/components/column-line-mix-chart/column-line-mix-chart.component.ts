import { Component, effect, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from 'ng-apexcharts';
import { SharedModule } from '../shared.module';
import { ChartLegend, RevenueData } from '../../shared/interfaces/dashboard';
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
@Component({
  selector: 'app-column-line-mix-chart',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './column-line-mix-chart.component.html',
  styleUrl: './column-line-mix-chart.component.scss',
})
export class ColumnLineMixChartComponent {
  currentTheme: InputSignal<'light' | 'dark'> = input.required<
    'light' | 'dark'
  >();
  currentLang: InputSignal<'en' | 'ar'> = input.required<'en' | 'ar'>();
  chartData: InputSignal<RevenueData[]> = input.required<RevenueData[]>();
  revenueChartLegends: InputSignal<ChartLegend[]> =
    input.required<ChartLegend[]>();
  labels: string[] = [];
  values1Arr: number[] = [];
  values2Arr: number[] = [];
  values3Arr: number[] = [];
  constructor() {
    effect(() => {
      const isAr = this.currentLang() === 'ar';
      const colors = ['#354a79', '#0AB39C', '#f06548'];
      const opacities = [0.1, 0.8, 1];
      this.labels = isAr
        ? this.chartData()
            .map((d) => d.arabicMonth)
            .reverse()
        : this.chartData().map((d) => d.englishMonth);

      this.values1Arr = isAr
        ? this.chartData()
            .map((d) => d.value1)
            .reverse()
        : this.chartData().map((d) => d.value1);

      this.values2Arr = isAr
        ? this.chartData()
            .map((d) => d.value2)
            .reverse()
        : this.chartData().map((d) => d.value2);

      this.values3Arr = isAr
        ? this.chartData()
            .map((d) => d.value3)
            .reverse()
        : this.chartData().map((d) => d.value3);
      const series = [
        {
          name: isAr
            ? this.revenueChartLegends()[0].arabicName
            : this.revenueChartLegends()[0].englishName,
          type: 'area',
          data: this.values1Arr,
        },
        {
          name: isAr
            ? this.revenueChartLegends()[1].arabicName
            : this.revenueChartLegends()[1].englishName,
          type: 'column',
          data: this.values2Arr,
        },
        {
          name: isAr
            ? this.revenueChartLegends()[2].arabicName
            : this.revenueChartLegends()[2].englishName,
          type: 'line',
          data: this.values3Arr,
        },
      ];
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: this.labels,
        },
        series: this.currentLang() === 'ar' ? [...series].reverse() : series,
        yaxis: {
          opposite: this.currentLang() === 'ar',
          labels: {
            style: {
              colors: '#878a99',
            },
          },
        },
        colors: this.currentLang() === 'ar' ? [...colors].reverse() : colors,
        fill: {
          ...this.chartOptions.fill,
          opacity:
            this.currentLang() === 'ar' ? [...opacities].reverse() : opacities,
        },
        grid: {
          ...this.chartOptions.grid,
          borderColor: this.currentTheme() === 'dark' ? '#2b2b2e' : '#f1f1f1',
        },
        tooltip: {
          ...this.chartOptions.tooltip,
          theme: this.currentTheme(),
          fillSeriesColor: false,
        },
      };
    });
  }
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Orders',
        type: 'area',
        data: this.values1Arr,
      },
      {
        name: 'Earnings',
        type: 'column',
        data: this.values2Arr,
      },
      {
        name: 'Refunds',
        type: 'line',
        data: this.values3Arr,
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      width: '100%',
      toolbar: {
        show: false,
      },
      // width: '0%',
    },
    colors: ['#354a79', '#0AB39C', '#f06548'],
    stroke: {
      // Curve style for each: smooth line, no border for column, smooth line
      // curve: ['smooth', 'straight', 'smooth'],
      curve: ['straight', 'straight', 'straight'],
      // Widths: Orders (2px), Earnings (0px border), Refunds (2px)
      width: [2, 0, 2],
      // Makes the 3rd series (Refunds) dashed. 5px dash, 5px space.
      dashArray: [0, 0, 5],
    },
    plotOptions: {
      bar: {
        columnWidth: '25%', // Makes the columns slim like the photo
        borderRadius: 0, // Soft rounded edges on top of the bars
        borderRadiusApplication: 'end',
      },
    },

    fill: {
      opacity: [0.1, 0.8, 1],
      type: 'solid',
    },
    // labels: [...this.labels],
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'category',
      categories: this.labels,
      axisBorder: {
        show: false, // Hides the bottom base line
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#878a99', // Matches your dashboard subtitle color
          fontSize: '13px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(2), // Ensures the .00 precision shown in photo
        style: {
          colors: '#878a99',
          fontSize: '20px',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' points';
          }
          return y;
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      offsetY: 7,
      markers: {
        // size: 6,
        strokeWidth: 0,
        offsetX: -5,
        // radius: 12, // Perfectly circular legend icons
      },
      labels: {
        colors: '#878a99',
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
    dataLabels: {
      enabled: false, // Prevents values from printing over the bars
    },
    grid: {
      strokeDashArray: 0,
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        left: 10,
        right: 10,
      },
    },
  };
}
