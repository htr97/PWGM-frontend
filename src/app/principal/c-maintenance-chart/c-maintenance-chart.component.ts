import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-c-maintenance-chart',
  templateUrl: './c-maintenance-chart.component.html',
  styleUrls: ['./c-maintenance-chart.component.css']
})
export class CMaintenanceChartComponent implements OnInit {

  user: User;
  mes = [];
  total = [];

  constructor(private accountService: AccountService, private maintenanceService: MaintenanceService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.maintenanceService.GetMaintenanceCResume(this.user.email).subscribe(maintenance => {

      for(var i = 0; i < maintenance.length; i++){
        this.mes[i] = maintenance[i].mes;
        this.total[i] = maintenance[i].total;
      }

      var myLineChart = new Chart("corrective-chart", {
        type: 'line',
        data: {
          datasets: [{
              label: 'Mantenimientos realizados',
              backgroundColor: 'rgba(100, 223, 223,0.6)',
              data: this.total
          }],
          labels: this.mes
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                suggestedMin: 1,
                suggestedMax: 10
            }
            }]
          }
        }
      });
    })
  }

}
