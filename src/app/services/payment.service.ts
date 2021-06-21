import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { PostPayment } from '../models/post-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetPaymentByEmail(email: string){
    return this.http.get<Payment>(this.baseUrl+'Payment/'+email);
  }

  PostPayment(payment: PostPayment){
    return this.http.post(this.baseUrl + 'Payment', payment);
  }
}
