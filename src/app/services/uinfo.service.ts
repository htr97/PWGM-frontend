import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { Uinfo } from '../models/uinfo';

@Injectable({
  providedIn: 'root'
})
export class UinfoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<Uinfo[]>(this.baseUrl+'users');
  }

  getUser(username: string){
    return this.http.get<Uinfo>(this.baseUrl+'users/'+username);
  }
}
