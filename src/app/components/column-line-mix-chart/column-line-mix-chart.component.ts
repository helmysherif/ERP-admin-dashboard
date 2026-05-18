import { Component } from '@angular/core';
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
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Orders',
        type: 'area',
        data: [34, 65, 55, 68, 49, 61, 42, 44, 78, 52, 63, 67],
      },
      {
        name: 'Earnings',
        type: 'column',
        data: [89, 99, 69, 109, 78, 84, 51, 29, 93, 42, 89, 37],
      },
      {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 13, 33],
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
    colors: [
      '#354a79', // Dark Blue for Orders
      '#0ab39c', // Teal/Green for Earnings
      '#f06548', // Orange/Red for Refunds
    ],
    stroke: {
      // Curve style for each: smooth line, no border for column, smooth line
      curve: ['smooth', 'straight', 'smooth'],
      // Widths: Orders (2px), Earnings (0px border), Refunds (2px)
      width: [2, 0, 2],
      // Makes the 3rd series (Refunds) dashed. 5px dash, 5px space.
      dashArray: [0, 0, 5],
    },
    plotOptions: {
      bar: {
        columnWidth: '15%', // Makes the columns slim like the photo
        borderRadius: 3, // Soft rounded edges on top of the bars
        borderRadiusApplication: 'end',
      },
    },

    fill: {
      opacity: [0.1, 1, 1],
      type: 'solid',
    },
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'category',
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
          fontSize: '13px',
        },
      },
    },
    grid: {
      strokeDashArray: 4, // Makes grid background lines subtly dashed
      borderColor: '#f1f1f1',
      padding: {
        left: 10,
        right: 10,
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
      offsetY: 8,
      markers: {
        // size: 6,
        strokeWidth: 0,
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
  };
}
