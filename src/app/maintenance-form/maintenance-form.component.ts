import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent {
  maintenanceForm = this.fb.group({
    descripcion: null,
    departamento: [null, Validators.required],
    equipo: [null, Validators.required],
    falla: [null, Validators.required],
    tipoMantenimiento: ['free', Validators.required]
  });

  hasUnitNumber = false;

  equipo = [
    {name: 'LAPTOP-52GSH3F'},
    {name: 'LAPTOP-34GHK83'},
    {name: 'LAPTOP-ABC123'}
  ];

  departamento = [
    {name: 'IT'},
    {name: 'Administracion'}
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Guardado');
  }
}
