import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Equipment } from '../models/equipment';
import { Uinfo } from '../models/uinfo';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { EquipmentService } from '../services/equipment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    Garantia : [null, Validators.required],
    Observation:null
  });

  user: User;
  uEmail: string;

  constructor(private fb: FormBuilder, private equipmentService: EquipmentService,
    private accountService: AccountService, private router: Router, private _snackBar: MatSnackBar) {
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
      garantia : this.inventoryForm.get('Garantia').value,
      userEmail: this.user.email
    }

    if(this.inventoryForm.invalid){
      this._snackBar.open("Formulario incompleto", "Ok", { duration: 2000 });
      return;
    }
    this.equipmentService.PostEquipment(equipment).subscribe(response =>
      {
        console.log(response);
        this.inventoryForm.reset();
        this._snackBar.open("Datos almacenados", "Ok", { duration: 2000 });
        this.router.navigateByUrl('/inventory');
      }, error =>
      {
        console.log(error);
      })
  //
 }


}
