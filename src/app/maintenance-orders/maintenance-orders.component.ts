import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MaintenanceDetailComponent } from '../maintenance-detail/maintenance-detail.component';
import { GetMaintenance } from '../models/get-maintenance';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MaintenanceService } from '../services/maintenance.service';

@Component({
  selector: 'app-maintenance-orders',
  templateUrl: './maintenance-orders.component.html',
  styleUrls: ['./maintenance-orders.component.css']
})
export class MaintenanceOrdersComponent implements OnInit {
  baseUrl = environment.apiUrl;
  user: User;
  ELEMENT_DATA: GetMaintenance[];
  displayedColumns: string[] = ['deviceName','startDate','endDate','priority','problem','maintenanceType',"actions"];
  dataSource = new MatTableDataSource<GetMaintenance>(this.ELEMENT_DATA);

  constructor(private http: HttpClient, private accountService: AccountService, private maintenanceService: MaintenanceService,
    private dialog: MatDialog)
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getMaintenance();
  }

  getMaintenance(){
    this.maintenanceService.GetMaintenanceByCompany(this.user.email).subscribe(maintenance => {
      this.dataSource.data = maintenance;
    })
  }

  deleteMaintenance(id: number): void{
    this.maintenanceService.deleteMaintenance(id).subscribe(response => {
      this.getMaintenance();
    })
  }

  editMaintenance(id: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"

    dialogConfig.data = {
      id: id,
      email: this.user.email
    }

    this.dialog.open(MaintenanceDetailComponent,dialogConfig);

    this.dialog.afterAllClosed.subscribe(() => {
      this.getMaintenance();
    })
  }
}
