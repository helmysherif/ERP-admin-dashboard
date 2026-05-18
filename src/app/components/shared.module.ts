import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
@NgModule({
  declarations: [],
  imports: [CommonModule, NgApexchartsModule, ChartComponent],
  exports: [NgApexchartsModule, ChartComponent],
})
export class SharedModule {}
