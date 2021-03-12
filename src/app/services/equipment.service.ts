import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  PostEquipment(equipment: Equipment){
    return this.http.post(this.baseUrl + 'Equipment', equipment);
  }

  GetEquipmentByCompany(email: string){
    return this.http.get<Equipment[]>(this.baseUrl+'Equipment/'+email);
  }

  deleteEquipment(id: number){
    return this.http.delete(this.baseUrl+'Equipment/'+id);
  }
}
