import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnyRecord } from 'node:dns';
import { isNumber } from 'node:util';
import { Chart } from 'node_modules/chart.js';
import { take } from 'rxjs/operators';
import { MaintenanceResume } from 'src/app/models/maintenance-resume';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-maintenances-chart',
  templateUrl: './maintenances-chart.component.html',
  styleUrls: ['./maintenances-chart.component.css']
})
export class MaintenancesChartComponent implements OnInit {

  data: MaintenanceResume[] = [];
  total1: number;
  total2: number;
  user: User;

  constructor(private accountService: AccountService, private maintenanceService: MaintenanceService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ctx = document.getElementById("pie-chart") ;

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.maintenanceService.GetMaintenanceResume(this.user.email).subscribe(maintenance => {

      this.data = maintenance;
      this.total1 = maintenance[0].total;
      this.total2 = maintenance[1].total;

      var myChart = new Chart("pie-chart", {
        type: 'pie',
        data: {
          datasets: [{
            label: 'Resumen de Mantenimientos',
            backgroundColor: ['#7400B8', '#4EA8DE'],
            data: [this.total1,this.total2]
          }],
          labels: [
            'Correctivo',
            'Preventivo'
          ]
        },
        options: {
          // title: {
          //   display: true,
          //   text: 'Resumen de Mantenimientos'
          // },
          responsive: true,
          legend: {
            position: 'top',
          }
        }
      });
    })
  }

}
