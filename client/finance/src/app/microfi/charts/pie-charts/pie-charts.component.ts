import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent implements OnInit {

/**
 * Pie charts for microfinance data in microfinance panel
 */
pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  tooltips: {
    enabled: true,
    mode: 'single',
    callbacks: {
      label(tooltipItems, data) {
        return data.datasets[0].data[tooltipItems.index] + ' %';
      },
    },
  },
};

pieChartLabels: Label[] = ['Nitrogen', 'Oxygen', 'Argon', 'Carbon dioxide'];

pieChartData: number[] = [78.09, 20.95, 0.93, 0.03];

pieChartType: ChartType = 'pie';

pieChartLegend = true;

pieChartPlugins = [];

pieChartColors = [
  {
    backgroundColor: [
      'rgba(255,0,0,0.3)',
      'rgba(0,255,0,0.3)',
      'rgba(0,0,255,0.3)',
    ],
  },
];
constructor() {}

ngOnInit(): void {}
}
