import { Component, OnInit } from '@angular/core';
import {
  Microfi,
  Board,
  Address,
  MfiReport,
  Stakeholder,
} from '../../share/model/models';
import { MicrofiService } from '../service/microfi.service';
import { AuthService } from '../../share/security/service/auth.service';
import { ToastService } from '../../share/message/service/toast.service';
import { AddressEditComponent } from '../forms/address-edit/address-edit.component';
import { BoardEditComponent } from '../forms/board-edit/board-edit.component';
import { StakeholderEditComponent } from '../forms/stakeholder-edit/stakeholder-edit.component';
import { ReportEditComponent } from '../forms/report-edit/report-edit.component';
import { AddressAddComponent } from '../forms/address-add/address-add.component';
import { StakeholderAddComponent } from '../forms/stakeholder-add/stakeholder-add.component';
import { BoardAddComponent } from '../forms/board-add/board-add.component';
import { ReportAddComponent } from '../forms/report-add/report-add.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RegisterEditComponent } from '../forms/register-edit/register-edit.component';
import { DeleteDialogComponent } from '../../share/message/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MicrofiService, AuthService, ToastService],
})
export class ProfileComponent implements OnInit {
  // Mfi model imports
  users: Microfi[];
  boards: Board[];
  addresses: Address[];
  reports: MfiReport[];
  stakeholders: Stakeholder[];
  errorMessage = '';

  // Loading data
  loading = false;
  loggedUser: Microfi;
  total: number;
  id: number;

  constructor(
    public mfiService: MicrofiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private toastMessage: ToastService
  ) {}

  ngOnInit(): any {
    // get data for current logged in user/mfi
    const id = this.authService.currentUserValue.id;
    this.loading = true;
    this.mfiService
      .getMfiById(id)
      .pipe(first())
      .subscribe((res) => {
        this.loading = false;
        this.loggedUser = res;
      }, error => {
        this.errorMessage = error;
      });

    // Find all stakeholder members
    this.loading = true;
    this.mfiService
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
    this.mfiService
      .getMfiBoard()
      .pipe(first())
      .subscribe((resb) => {
        this.loading = false;
        this.boards = resb;
        this.total = this.boards.length;
      });

    // Find all Mfi address
    this.loading = true;
    this.mfiService
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
    this.mfiService
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

  /**
   * update Mfi as User
   */
  updateMfi(
    id: number,
    mfi_name: string,
    mfi_license: string,
    mfi_service: string,
    mfi_technology: string,
    mfi_assets: string,
    mfi_liability: string,
    email: string
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(RegisterEditComponent, {
      width: '400px',
      height: '75%',

      data: {
        id,
        mfi_name,
        mfi_license,
        mfi_service,
        mfi_technology,
        mfi_assets,
        mfi_liability,
        email,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.toastMessage.showSuccess(
          'Mfi updated successfully',
          'Microfinance Monitoring'
        );
        this.router.navigate(['/microfi/home/']);
      }
    });
  }

  /**
   * update Mfi Address
   */
  updateMfiAddress(
    id: number,
    address_office: string,
    address_district: string,
    address_region: string,
    address_pobox: string,
    addres_phone_number: string,
    address_website: string
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(AddressEditComponent, {
      width: '400px',
      height: '75%',

      data: {
        id,
        address_office,
        address_district,
        address_region,
        address_pobox,
        addres_phone_number,
        address_website,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.toastMessage.showSuccess(
          'Mfi Address updated successfully',
          'Microfinance Monitoring'
        );
        this.router.navigate(['/microfi/home/']);
      }
    });
  }

  deleteMfiAddress(id: number): any {
    const confirmDialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Confirm to Delete',
        message: 'Are you sure, you want to delete: ',
      },
      minWidth: '250px',
      minHeight: '150px',
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.mfiService.deleteMfiAddress(id).subscribe(
          (resp) => {
            this.toastMessage.showWarning(
              `Mfi deleted successfully ${resp.address_office}`,
              `Microfinance Monitoring `
            );
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      }
    });
  }

  /**
   * update Mfi Board
   */
  updateMfiBoard(
    id: number,
    board_first_name: string,
    board_middle_name: string,
    board_last_name: string,
    board_email: string,
    board_phone_number: string,
    board_citizenship: string,
    board_position: string
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(BoardEditComponent, {
      width: '400px',
      height: '75%',

      data: {
        id,
        board_first_name,
        board_middle_name,
        board_last_name,
        board_email,
        board_phone_number,
        board_citizenship,
        board_position,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.toastMessage.showSuccess(
          'Mfi Board updated successfully',
          'Microfinance Monitoring'
        );
        this.router.navigate(['/microfi/home/']);
      }
    });
  }

  /**
   * update Mfi Stakeholder
   */
  updateMfiStakeholder(
    id: number,
    stake_first_name: string,
    stake_middle_name: string,
    stake_last_name: string,
    stake_email: string,
    stake_phone_number: string,
    stake_citizenship: string,
    stake_share: string
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(StakeholderEditComponent, {
      width: '400px',
      height: '75%',

      data: {
        id,
        stake_first_name,
        stake_middle_name,
        stake_last_name,
        stake_email,
        stake_phone_number,
        stake_citizenship,
        stake_share,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.toastMessage.showSuccess(
          'Mfi Stakeholder successfully',
          'Microfinance Monitoring'
        );
        this.router.navigate(['/microfi/home/']);
      }
    });
  }

  /**
   * update Mfi Report
   */
  updateMfiReport(
    id: number,
    report_assets: string,
    report_liability: string,
    report_revenue: string,
    report_income: string,
    report_dividend: string
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(ReportEditComponent, {
      width: '300px',
      height: '75%',

      data: {
        id,
        report_assets,
        report_liability,
        report_revenue,
        report_income,
        report_dividend,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.toastMessage.showSuccess(
          'Mfi report updated successfully',
          'Microfinance Monitoring'
        );
        this.router.navigate(['/microfi/home/']);
      }
    });
  }

  // Address dialog component
  openAddressDialog(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '75%';

    dialogConfig.data = {
      title: 'Add Address',
    };
    this.dialog.open(AddressAddComponent, dialogConfig);
  }

  // Stakeholder dialog component
  openStakeholderDialog(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '75%';

    dialogConfig.data = {
      title: 'Add Stakeholder',
    };
    this.dialog.open(StakeholderAddComponent, dialogConfig);
  }

  // Management dialog component
  openManagementDialog(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '75%';

    dialogConfig.data = {
      title: 'Add Managemnt',
    };
    this.dialog.open(BoardAddComponent, dialogConfig);
  }

  // Report dialog component
  openReportDialog(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '75%';

    dialogConfig.data = {
      title: 'Add Report',
    };
    this.dialog.open(ReportAddComponent, dialogConfig);
  }
}
