import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostProblem } from '../models/post-problem';
import { Problem } from '../models/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetProblemByCompany(email: string){
    return this.http.get<Problem[]>(this.baseUrl+'Problem/company/'+email);
  }

  PostProblemByCompany(PostProblem: PostProblem){
    return this.http.post(this.baseUrl + 'Problem', PostProblem);
  }

  deleteProblem(id: number){
    return this.http.delete(this.baseUrl+'Problem/'+id);
  }
}
