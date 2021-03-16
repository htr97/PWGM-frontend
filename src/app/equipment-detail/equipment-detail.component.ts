import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
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

  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

}
