import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { RoTableDataSource, RoTableItem } from './ro-table-datasource';

@Component({
  selector: 'b4os-ro-table',
  templateUrl: './ro-table.component.html',
  styleUrls: ['./ro-table.component.css']
})
export class RoTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<RoTableItem>;
  dataSource: RoTableDataSource;

  ngOnInit() {
    this.dataSource = new RoTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
