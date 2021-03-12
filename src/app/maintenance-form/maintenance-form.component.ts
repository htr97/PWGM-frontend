import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Maintenance } from '../models/maintenance';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { EquipmentService } from '../services/equipment.service';
import { MaintenanceService } from '../services/maintenance.service';
import { ProblemService } from '../services/problem.service';

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

  hasUnitNumber = false;
  user: User;

  equipo = [];

  problema = [];


  constructor(private fb: FormBuilder, private accountService: AccountService, private problemService: ProblemService,
    private equipmentService: EquipmentService, private maintenanceService: MaintenanceService) {
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
      console.log('Formulario invalido');
    }
    this.maintenanceService.PostMaintenance(maintenance).subscribe(response =>
      {
        console.log(response);
        this.maintenanceForm.reset();
        alert('Datos almacenados');
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
