import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ubication } from '../models/ubication';

@Injectable({
  providedIn: 'root'
})
export class UbicationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetUbicationById(id: number){
    return this.http.get<Ubication>(this.baseUrl+'Ubications/'+id);
  }

  GetUbicationByCompany(email: string){
    return this.http.get<Ubication[]>(this.baseUrl+'Ubications/user/'+email);
  }
}
