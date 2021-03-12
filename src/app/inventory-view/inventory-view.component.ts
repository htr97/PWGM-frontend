import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit {
  baseUrl = environment.apiUrl;
  user: User;
  ELEMENT_DATA: Equipment[];
  displayedColumns: string[] = ['id','deviceName','storageType','processor','osName',"actions"];
  dataSource = new MatTableDataSource<Equipment>(this.ELEMENT_DATA);

  constructor(private http: HttpClient, private accountService: AccountService, private equipmentService: EquipmentService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment(){
    this.equipmentService.GetEquipmentByCompany(this.user.email).subscribe(equipment => {
      this.dataSource.data = equipment;
    })
  }

  edit(id): void{
    console.log(id);
  }

  deleteEquipment(id: number): void{
    this.equipmentService.deleteEquipment(id).subscribe(response => {
      console.log(response);
      this.getEquipment();
    })
  }
}
