import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MaintenanceOrdersDataSource, MaintenanceOrdersItem } from './maintenance-orders-datasource';

@Component({
  selector: 'app-maintenance-orders',
  templateUrl: './maintenance-orders.component.html',
  styleUrls: ['./maintenance-orders.component.css']
})
export class MaintenanceOrdersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MaintenanceOrdersItem>;
  dataSource: MaintenanceOrdersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['equipo', 'departamento','tipoMantenimiento','fecha','prioridad','actions'];

  ngOnInit() {
    this.dataSource = new MaintenanceOrdersDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
