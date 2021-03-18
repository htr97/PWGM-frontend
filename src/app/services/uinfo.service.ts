import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { PutUser } from '../models/put-user';
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

  UpdateProfile(user: PutUser){
    return this.http.post(this.baseUrl + 'Users/profile', user);
  }

  getUserByEmail(email: string){
    return this.http.get<PutUser>(this.baseUrl+'Users/'+email);
  }
}
