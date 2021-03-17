import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetEquipment } from '../models/get-equipment';
import { EquipmentService } from '../services/equipment.service';
import { UbicationService } from '../services/ubication.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

  equipmentId: number;
  userEmail: string;
  ubicationId: number;
  //equipo: any;
  inventoryForm = new FormGroup ({
    DeviceName: new FormControl('', [Validators.required]),
    SystemType: new FormControl('', [Validators.required]),
    Processor: new FormControl('', [Validators.required]),
    Memory: new FormControl('', [Validators.required]),
    OsName: new FormControl('', [Validators.required]),
    StorageCap: new FormControl('', [Validators.required]),
    StorageType: new FormControl('', [Validators.required]),
    Ubication : new FormControl('', [Validators.required]),
    Observation: new FormControl('')
  });

  ubications = [];

  constructor(public dialog: MatDialog, private fb: FormBuilder, private equipmentService: EquipmentService,
    private ubicationService: UbicationService, @Inject(MAT_DIALOG_DATA) data) {
      this.equipmentId = data.id;
      this.userEmail = data.email;
    }

  ngOnInit(): void {
    this.getEquipmentById();
    this.getUbications();
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  getEquipmentById(){
    this.equipmentService.GetEquipmentById(this.equipmentId).subscribe(equipment => {
      this.inventoryForm.controls.DeviceName.setValue(equipment.deviceName);
      this.inventoryForm.controls.SystemType.setValue(equipment.systemType);
      this.inventoryForm.controls.Processor.setValue(equipment.processor);
      this.inventoryForm.controls.Memory.setValue(equipment.memory);
      this.inventoryForm.controls.OsName.setValue(equipment.osName);
      this.inventoryForm.controls.StorageCap.setValue(equipment.storageCap);
      this.inventoryForm.controls.StorageType.setValue(equipment.storageType);
      this.inventoryForm.controls.Observation.setValue(equipment.observation);
      this.ubicationId = equipment.ubicationId;
      this.equipmentId = equipment.id;
      this.getUbication(this.ubicationId);
    })
  }

  getUbication(id: number){
    this.ubicationService.GetUbicationById(id).subscribe(ubication => {
      this.inventoryForm.controls.Ubication.setValue(ubication.id);
    })
  }

  getUbications(){
    this.ubicationService.GetUbicationByCompany(this.userEmail).subscribe(ubication => {
      this.ubications = ubication
    });
  }

  onSubmit(){
    const equipment: GetEquipment = {
      id: this.equipmentId,
      deviceName: this.inventoryForm.get('DeviceName').value,
      systemType: this.inventoryForm.get('SystemType').value,
      processor: this.inventoryForm.get('Processor').value,
      memory: this.inventoryForm.get('Memory').value,
      osName: this.inventoryForm.get('OsName').value,
      storageCap: this.inventoryForm.get('StorageCap').value,
      storageType: this.inventoryForm.get('StorageType').value,
      ubicationId: this.inventoryForm.get('Ubication').value,
      observation: this.inventoryForm.get('Observation').value
    }

    if(this.inventoryForm.invalid){
      console.log('Invalid form');
      return;
    }
    this.equipmentService.UpdateEquipment(equipment).subscribe(response =>
      {
        console.log(response);
        this.inventoryForm.reset();
        alert('Datos almacenados');
        this.onNoClick();
      }, error =>
      {
        console.log(error);
      })
  }


}
