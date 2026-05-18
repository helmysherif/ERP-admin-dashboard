import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnLineMixChartComponent } from './column-line-mix-chart.component';

describe('ColumnLineMixChartComponent', () => {
  let component: ColumnLineMixChartComponent;
  let fixture: ComponentFixture<ColumnLineMixChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnLineMixChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnLineMixChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
