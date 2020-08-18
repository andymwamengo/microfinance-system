import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MicrofiService } from '../../../microfi/service/microfi.service';
import { Microfi } from '../../model/models';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [MicrofiService]
})
export class TablesComponent implements OnInit, AfterViewInit {

  // microfi: Microfi[] = [];
  public displayedColumns = ['mfi_type', 'mfi_name', 'mfi_service', 'mfi_assets', 'mfi_liability',
                             'mfi_technology', 'email'];

  // sorting and pagination of mfi data
  public dataSource = new MatTableDataSource<Microfi>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    constructor(public mfiService: MicrofiService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      // Find all mfi list
      this.getAllMfiList();
    }

    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    getAllMfiList(): void{
      // this.mfiService.getAllMfi().subscribe((data: Microfi[]) => {
      //   console.log(data);
      //   this.dataSource.data = data as Microfi[];
      // });
      this.activatedRoute.data.subscribe(
        (data: { microfi: Microfi[] }) => {
          this.dataSource.data = data.microfi;
        },
        (error) => {
          console.log(error);
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

}
