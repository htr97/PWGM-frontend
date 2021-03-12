import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetMaintenance } from '../models/get-maintenance';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  PostMaintenance(maintenance: Maintenance){
    return this.http.post(this.baseUrl + 'Maintenance', maintenance);
  }

  GetMaintenanceByCompany(email: string){
    return this.http.get<GetMaintenance[]>(this.baseUrl+'Maintenance/company/'+email);
  }

  deleteMaintenance(id: number){
    return this.http.delete(this.baseUrl+'Maintenance/'+id);
  }

}
