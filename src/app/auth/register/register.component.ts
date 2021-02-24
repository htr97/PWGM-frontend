import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  registrationForm = FormGroup;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  register(form){
    console.log('Form'+form.value);
    this.accountService.register(form.value).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/principal');
    }, error => {
      console.log(error);
    })
  }

  cancel(){
    console.log('Cancel');
    this.router.navigateByUrl('/')
  }
}
