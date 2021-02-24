import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AccountService } from 'src/app/services/account.service';
import { error } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.accountService.login(this.model).subscribe(response =>
      {
        console.log(response);
        this.router.navigateByUrl('/principal')
      }, error => {
        console.log(error);
      })
  }

}
