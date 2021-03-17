import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { MaintenanceDetail } from '../models/maintenance-detail';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MaintenanceService } from '../services/maintenance.service';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.css']
})
export class MaintenanceDetailComponent implements OnInit {

  maintenanceForm = new FormGroup ({
    Description: new FormControl('', [Validators.required]),
    Problem: new FormControl('', [Validators.required]),
    // Device: new FormControl('', [Validators.required]),
    TypeMain: new FormControl('', [Validators.required]),
    TypePriority: new FormControl('', [Validators.required]),
    StartDate: new FormControl('', [Validators.required]),
    EndDate: new FormControl('', [Validators.required])
  });

  maintenanceId: number;
  userEmail: string;
  problema = [];
  mantenimiento: any;
  user: User;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private problemService: ProblemService,
    private maintenanceService: MaintenanceService, @Inject(MAT_DIALOG_DATA) data) {
      //this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      this.maintenanceId = data.id;
      this.userEmail = data.email;
    }

  ngOnInit(): void {
    this.getProblem();
    this.getMaintenance(this.maintenanceId);
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  getProblem(){
    this.problemService.GetProblemByCompany(this.userEmail).subscribe(problem => {
      this.problema = problem;
    })
  }

  getMaintenance(id: number){
    this.maintenanceService.GetMaintenanceById(id).subscribe(maintenance => {
      this.mantenimiento = maintenance;
      this.maintenanceForm.controls.Description.setValue(maintenance.description);
      this.maintenanceForm.controls.Problem.setValue(maintenance.problemId);
      this.maintenanceForm.controls.TypeMain.setValue(maintenance.maintenanceTypeId);
      this.maintenanceForm.controls.TypePriority.setValue(maintenance.priorityId);
      this.maintenanceForm.controls.StartDate.setValue(maintenance.startDate);
      this.maintenanceForm.controls.EndDate.setValue(maintenance.endDate);
    })
  }

  onSubmit(){
    const _maintenance: MaintenanceDetail = {
      id: this.maintenanceId,
      description: this.maintenanceForm.get('Description').value,
      startDate:this.maintenanceForm.get('StartDate').value,
      endDate: this.maintenanceForm.get('EndDate').value,
      maintenanceTypeId:this.maintenanceForm.get('TypeMain').value,
      priorityId: this.maintenanceForm.get('TypePriority').value,
      problemId: this.maintenanceForm.get('Problem').value
    }

    if(this.maintenanceForm.invalid){
      alert('Favor llenar todos los campos');
      return;
    }

    console.log(_maintenance);
    this.maintenanceService.UpdateMaintenance(_maintenance).subscribe(response =>
      {
        console.log(response);
        this.maintenanceForm.reset();
        alert('Datos almacenados');
        this.onNoClick();
      }, error =>
      {
        console.log(error);
      })
  }
}
