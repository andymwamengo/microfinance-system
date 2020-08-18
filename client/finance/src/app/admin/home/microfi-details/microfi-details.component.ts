import { Component, OnInit } from '@angular/core';
import {
  Microfi,
  Board,
  Address,
  MfiReport,
  Stakeholder,
} from '../../../share/model/models';
import { ActivatedRoute, Router } from '@angular/router';
import { MicrofiService } from '../../../microfi/service/microfi.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-microfi-details',
  templateUrl: './microfi-details.component.html',
  styleUrls: ['./microfi-details.component.scss'],
  providers: [MicrofiService],
})
export class MicrofiDetailsComponent implements OnInit {
  /** Microfinance details page */
  id: number;
  microfi: Microfi;
  boards: Board[];
  addresses: Address[];
  reports: MfiReport[];
  stakeholders: Stakeholder[];
  loading = false;
  total: number;
  errorMessage = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private microfiService: MicrofiService
  ) {}

  ngOnInit(): void {
    // Find get mfi by id
    this.id = this.activatedRoute.snapshot.params.id;
    this.microfiService.getMfiById(this.id).subscribe(
      (resp) => {
        console.log(resp);
        this.microfi = resp;
      },
      (error) => {
        this.errorMessage = error;
      });

    // Find all stakeholder members
    this.loading = true;
    this.microfiService
      .getMfiStakeholder()
      .pipe(first())
      .subscribe(
        (ress) => {
          this.loading = false;
          this.stakeholders = ress;
          this.total = this.stakeholders.length;
        },
        (error) => {
         this.errorMessage = error;
        }
      );

    // Find all Board members
    this.loading = true;
    this.microfiService
      .getMfiBoard()
      .pipe(first())
      .subscribe((resb) => {
        this.loading = false;
        this.boards = resb;
        this.total = this.boards.length;
      });

    // Find all Mfi address
    this.loading = true;
    this.microfiService
      .getMfiAddress()
      .pipe(first())
      .subscribe(
        (resa) => {
          this.loading = false;
          this.addresses = resa;
          this.total = this.addresses.length;
        },
        (error) => {
          this.errorMessage = error;
        }
      );

    // Find all mfi reports
    this.loading = true;
    this.microfiService
      .getMfiReport()
      .pipe(first())
      .subscribe(
        (resr) => {
          this.loading = false;
          this.reports = resr;
          this.total = this.reports.length;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  public goBack(): void{
    this.router.navigate(['/admin/home/']);
  }
}
