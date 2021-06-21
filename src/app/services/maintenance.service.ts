import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetMaintenance } from '../models/get-maintenance';
import { Maintenance } from '../models/maintenance';
import { MaintenanceDates } from '../models/maintenance-dates';
import { MaintenanceDetail } from '../models/maintenance-detail';
import { MaintenanceResume } from '../models/maintenance-resume';
import { MaintenanceTypeResume } from '../models/maintenancetype-resume';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  baseUrl = environment.apiUrl;
  resume: MaintenanceResume[] = [];

  constructor(private http: HttpClient) { }

  PostMaintenance(maintenance: Maintenance){
    return this.http.post(this.baseUrl + 'Maintenance', maintenance);
  }

  GetMaintenanceByCompany(email: string){
    return this.http.get<GetMaintenance[]>(this.baseUrl+'Maintenance/company/'+email);
  }

  GetMaintenanceById(id: number){
    return this.http.get<MaintenanceDetail>(this.baseUrl+'Maintenance/'+ id);
  }

  GetMaintenanceResume(email: string){
    return this.http.get<MaintenanceResume[]>(this.baseUrl+'Maintenance/resume/'+ email);
  }

  GetMaintenanceCResume(email: string){
    return this.http.get<MaintenanceTypeResume[]>(this.baseUrl+'Maintenance/corrective/'+ email);
  }

  GetMaintenancePResume(email: string){
    return this.http.get<MaintenanceTypeResume[]>(this.baseUrl+'Maintenance/preventive/'+ email);
  }

  GetMaintenanceDates(email: string){
    return this.http.get<MaintenanceDates[]>(this.baseUrl+'Maintenance/mdates/'+ email);
  }

  deleteMaintenance(id: number){
    return this.http.delete(this.baseUrl+'Maintenance/'+id);
  }

  UpdateMaintenance(maintenance: MaintenanceDetail){
    return this.http.post(this.baseUrl + 'Maintenance/maintenance', maintenance);
  }
}
