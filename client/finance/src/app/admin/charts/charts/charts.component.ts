import { Component, OnInit } from '@angular/core';
import { MicrofiService } from '../../../microfi/service/microfi.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [MicrofiService],
})
export class ChartsComponent implements OnInit {
  totalMfi: any;
  totalMfiType: any;

  constructor(private microfiService: MicrofiService) {}

  ngOnInit(): void {
    /** Total Mfi  */
    this.microfiService.getTotalMfi().subscribe(
      (resp) => {
        this.totalMfi = JSON.stringify(resp[1]);
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );

    /** Total Assets by Mfi Type */
    this.microfiService.getMfiTypeAssets().subscribe(
      (res) => {
        this.totalMfiType = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
