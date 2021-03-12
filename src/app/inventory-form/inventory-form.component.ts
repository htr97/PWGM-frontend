import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { take } from 'rxjs/operators';
import { Equipment } from '../models/equipment';
import { Uinfo } from '../models/uinfo';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent {

  inventoryForm = this.fb.group({
    DeviceName: [null, Validators.required],
    SystemType: [null, Validators.required],
    Processor: [null, Validators.required],
    Memory: [null, Validators.required],
    OsName: [null, Validators.required],
    StorageCap: [null, Validators.required],
    StorageType: [null, Validators.required],
    Ubication : [null, Validators.required],
    Observation:null
  });

  user: User;
  uEmail: string;

  constructor(private fb: FormBuilder, private equipmentService: EquipmentService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

 onSubmit() {
    const equipment: Equipment = {
      deviceName: this.inventoryForm.get('DeviceName').value,
      systemType: this.inventoryForm.get('SystemType').value,
      processor: this.inventoryForm.get('Processor').value,
      memory: this.inventoryForm.get('Memory').value,
      osName: this.inventoryForm.get('OsName').value,
      storageCap: this.inventoryForm.get('StorageCap').value,
      storageType: this.inventoryForm.get('StorageType').value,
      ubication: this.inventoryForm.get('Ubication').value,
      observation: this.inventoryForm.get('Observation').value,
      userEmail: this.user.email
    }

    if(this.inventoryForm.invalid){
      console.log('Invalid form');
      return;
    }
    this.equipmentService.PostEquipment(equipment).subscribe(response =>
      {
        console.log(response);
        this.inventoryForm.reset();
        alert('Datos almacenados');
      }, error =>
      {
        console.log(error);
      })
  //
 }


}
