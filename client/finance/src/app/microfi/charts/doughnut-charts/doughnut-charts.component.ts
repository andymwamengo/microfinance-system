import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-charts',
  templateUrl: './doughnut-charts.component.html',
  styleUrls: ['./doughnut-charts.component.scss']
})
export class DoughnutChartsComponent implements OnInit {


  doughnutChartLabels: Label[] = ['PUBG', 'Call of Duty', 'Fortnite'];
  doughnutChartData: MultiDataSet = [
    [53, 30, 17]
  ];
  doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
