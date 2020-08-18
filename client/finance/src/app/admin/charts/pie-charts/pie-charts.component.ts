import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, constructor } from 'chart.js';
import { Label } from 'ng2-charts';
import { MicrofiService } from 'src/app/microfi/service/microfi.service';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss'],
  providers: [MicrofiService],
})
export class PieChartsComponent implements OnInit {
  /**
   * Pie charts for microfinance data in admin panel
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
        label(tooltipItems, data): any {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        },
      },
    },
  };

  // pieChartLabels: Label[] = [];
  pieChartLabels: Label[] = ['Nitrogen', 'Oxygen', 'Argon', 'Carbon dioxide'];

  pieChartData: number[] = [78.09, 20.95, 50.93, 99.53];
  // pieChartData: number[] = [];

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
  constructor(private microfiService: MicrofiService) {}

  ngOnInit(): void {
    /** Total Assets by Mfi Type */
    this.microfiService.getMfiTypeAssets().subscribe(
      (res) => {
        for (const x of res) {
          for (const y of x) {
            // this.pieChartLabels = y.mfi_type;
            // this.pieChartData = y.type;
          }
        }
        this.pieChartLabels = res;
        console.log(res);
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // <div *ngFor = "let test of totalMfiType; let i = index">
  //     <div *ngFor = "let student of test ;let n = index">
  //     <div>{{student.mfi_type+' '+student.type | uppercase }}</div>
  // </div>
  // </div>
}
