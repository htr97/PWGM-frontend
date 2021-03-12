import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AccountService } from 'src/app/services/account.service';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { FormBuilder, Validators  } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { logUser } from 'src/app/models/log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {}
  loginForm = this.fb.group({
    Email: [null, Validators.required],
    Password: [null, Validators.required, Validators.minLength(4),Validators.maxLength(8)]
  })

  constructor(private fb: FormBuilder, public accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    const user: logUser ={
      email: this.loginForm.get('Email').value,
      password:  this.loginForm.get('Password').value
    }
    this.accountService.login(user).subscribe(response =>
      {
        this.router.navigate(["/principal"]);
      }, error => {
        console.log(error);
      })
  }

}
