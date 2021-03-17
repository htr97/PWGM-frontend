import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';
import { GetEquipment } from '../models/get-equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  PostEquipment(equipment: Equipment){
    return this.http.post(this.baseUrl + 'Equipment', equipment);
  }

  UpdateEquipment(equipment: GetEquipment){
    return this.http.post(this.baseUrl + 'Equipment/equipment/', equipment);
  }

  GetEquipmentByCompany(email: string){
    return this.http.get<Equipment[]>(this.baseUrl+'Equipment/'+email);
  }

  GetEquipmentById(id: number){
    return this.http.get<GetEquipment>(this.baseUrl+'Equipment/code/'+id);
  }

  deleteEquipment(id: number){
    return this.http.delete(this.baseUrl+'Equipment/'+id);
  }
}
