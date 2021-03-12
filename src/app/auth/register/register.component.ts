import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    FirstName: [null, Validators.required, Validators.maxLength(25)],
    LastName: [null, Validators.required, Validators.maxLength(25)],
    Email: [null, Validators.required],
    Country: [null, Validators.required],
    Company: [null, Validators.required],
    Telephone: [null, Validators.required],
    Title: [null, Validators.required],
    Password: [null, Validators.required, Validators.minLength(4),Validators.maxLength(8)],
  })


  registrationForm = FormGroup;
  constructor(private fb: FormBuilder,private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    const regU: Register = {
      FirstName: this.registerForm.get('FirstName').value,
      LastName: this.registerForm.get('LastName').value,
      Email: this.registerForm.get('Email').value,
      Country: this.registerForm.get('Country').value,
      Company: this.registerForm.get('Company').value,
      Telephone: this.registerForm.get('Telephone').value,
      Title: this.registerForm.get('Title').value,
      Password: this.registerForm.get('Password').value,
    }
    this.accountService.register(regU).subscribe(response => {
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
