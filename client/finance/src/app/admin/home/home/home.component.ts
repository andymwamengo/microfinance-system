import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Microfi, UserFeedback } from 'src/app/share/model/models';
import { MicrofiService } from '../../../microfi/service/microfi.service';
import { ToastService } from '../../../share/message/service/toast.service';
import { DeleteDialogComponent } from '../../../share/message/dialog/delete-dialog/delete-dialog.component';

import * as XLSX from 'xlsx';
import { AdminService } from '../../service/admin.service';
import { UserService } from '../../../share/user/service/user.service';
import { FeedbackComponent } from '../../review/feedback/feedback.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../share/security/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AdminService, ToastService, UserService, AuthService],
})
export class HomeComponent implements OnInit, AfterViewInit {
  mfi: Microfi[];
  userFeedback: UserFeedback[];
  // Pagination
  page = 1;
  total: number;
  loading = false;
  errorMessage = '';
  successMessage: any[];

  // Neccessary imports section
  public displayedColumns: string[] = [
    'mfi_type',
    'mfi_name',
    'mfi_service',
    'mfi_assets',
    'mfi_liability',
    'mfi_technology',
    'email',
    'details',
    'feedback',
  ];

  // sorting and pagination of mfi data
  public dataSource = new MatTableDataSource<Microfi>();
  private dataLength: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Dashboard constructor sesction
  constructor(
    private mfiService: MicrofiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // NgOninit app lifescyle
  ngOnInit(): any {
    // Find all mfi list
    this.getMfiList();
  }

  // After init app lifecyle
  ngAfterViewInit(): any {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /* Find all Mfi list*/
  getMfiList(): void {
    // this.mfiService.getAllMfi().subscribe(
    //   (resp: Microfi[]) => {
    //     this.dataSource.data = resp as Microfi[];
    //     // this.messageService.add('Mfi Feedback Found');
    //   },
    //   (error) => {
    //   }
    // );
    this.activatedRoute.data.subscribe(
      (data: { microfi: Microfi[] }) => {
        this.dataSource.data = data.microfi;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  // Filter mfi list
  public filterMfi = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // Export excel
  exportExcel(): void {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'microfinance-list.xlsx');
  }

  // Export CSV
  exportCsv(): void {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'microfinance-list.csv');
  }

  microfiDetails(mfi: Microfi): void {
    console.log('THE ID DEDICATED DATA TO', mfi.id);
    this.router.navigate(['admin/microfi/', mfi.id]);
  }


  // Delete Dialog section
  deleteDialog(mfi: any): void {
    const confirmDialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Confirm to Delete',
        message: 'Are you sure, you want to delete: ' + mfi.mfi_name,
      },
      minWidth: '250px',
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.successMessage = result;
      }
    });
  }

  // Admin Feedback dialog component
  openAdminFeedbackDialog(mfi: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.height = '400px'),
      (dialogConfig.data = {
        title: 'Add Admin Feedback',
      });
    this.dialog.open(FeedbackComponent, dialogConfig);
  }
}
