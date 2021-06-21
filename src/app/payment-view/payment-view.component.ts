import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { take } from 'rxjs/operators';
import { PostPayment } from '../models/post-payment';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {

  user: User;
  clicked = false;
  monto = 291.16;
  imp = 29.12;
  total = 220.28;
  formdata = this.fb.group({
    tar: null,
    venc: null,
    cvv: null,
    nom: null
  });

  constructor(private accountService: AccountService, private paymentService: PaymentService, private fb: FormBuilder) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const payment: PostPayment ={
      UserEmail: this.user.email
    }

    this.paymentService.PostPayment(payment).subscribe(response =>
      {
        console.log(response);
        this.monto = 0;
        this.imp = 0;
        this.total = 0;
        this.formdata.reset();
      }, error =>
      {
        console.log(error);
      })
  }

}
