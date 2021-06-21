import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { link } from 'node:fs';
import { take } from 'rxjs/operators';
import { Maintenance } from '../models/maintenance';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { EquipmentService } from '../services/equipment.service';
import { MaintenanceService } from '../services/maintenance.service';
import { ProblemService } from '../services/problem.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit{
  maintenanceForm = this.fb.group({
    descripcion: null,
    problema: [null, Validators.required],
    equipo: [null, Validators.required],
    tipoMantenimiento: ['free', Validators.required],
    tipoPrioridad: ['free', Validators.required],
    startDate: [Validators.required],
    endDate: [],
  });


  user: User;

  equipo = [];

  problema = [];


  constructor(private fb: FormBuilder, private accountService: AccountService, private problemService: ProblemService,
    private equipmentService: EquipmentService, private maintenanceService: MaintenanceService, private router: Router,
    private _snackBar: MatSnackBar ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getProblem();
    this.getEquipment();
  }

  onSubmit() {
    const maintenance: Maintenance ={
      startDate: this.maintenanceForm.get('startDate').value,
      endDate: this.maintenanceForm.get('endDate').value,
      description: this.maintenanceForm.get('descripcion').value,
      maintenanceTypeId: this.maintenanceForm.get('tipoMantenimiento').value,
      priorityId: this.maintenanceForm.get('tipoPrioridad').value,
      userEmail: this.user.email,
      problemId: this.maintenanceForm.get('problema').value,
      equipmentId: this.maintenanceForm.get('equipo').value
    }
    console.log(maintenance);

    if(this.maintenanceForm.invalid){
      this._snackBar.open("Formulario incompleto", "Ok", { duration: 2000 });
    }
    this.maintenanceService.PostMaintenance(maintenance).subscribe(response =>
      {
        console.log(response);
        this.maintenanceForm.reset();
        this._snackBar.open("Datos almacenados", "Ok", { duration: 2000 });
        this.router.navigateByUrl('/maintenance-orders');
      }, error =>
      {
        console.log(error);
      })
  }

  getProblem(){
    this.problemService.GetProblemByCompany(this.user.email).subscribe(problem => {
      this.problema = problem;
    })
  }

  getEquipment(){
    this.equipmentService.GetEquipmentByCompany(this.user.email).subscribe(equipment => {
      this.equipo = equipment;
    })
  }
}
