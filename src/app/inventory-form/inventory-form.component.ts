import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent {
  addressForm = this.fb.group({
    descripcion: null,
    departamento: [null, Validators.required],
    equipo: [null, Validators.required],
    falla: [null, Validators.required],
    tipoMantenimiento: ['free', Validators.required]
  });

  hasUnitNumber = false;

  equipo = [
    {name: 'Computadora'},
    {name: 'Laptop'},
    {name: 'Computadora'},
    {name: 'Laptop'},
    {name: 'Computadora'},
    {name: 'Laptop'},
    {name: 'Computadora'},
    {name: 'Laptop'}
  ];

  departamento = [
    {name: 'Administracion'}
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Guardado!');
  }
}
