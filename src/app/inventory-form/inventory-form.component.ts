import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent {
  inventoryForm = this.fb.group({
    equipo: [null, Validators.required],
    arquitectura: [null, Validators.required],
    procesador: [null, Validators.required],
    ram: [null, Validators.required],
    ubicacion: [null, Validators.required],
    adicional:null
  });

  hasUnitNumber = false;


  constructor(private fb: FormBuilder) {}

  equip='';

 onSubmit() {
   if(this.inventoryForm.invalid){
    console.log(this.inventoryForm.get('equipo').value);
    return;
   }
   alert('Datos almacenados');
  //  this.inventoryForm.resetForm();
 }

}
