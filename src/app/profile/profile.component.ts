import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { PutUser } from '../models/put-user';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { UinfoService } from '../services/uinfo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    birthDate: [null, Validators.required],
    telephone: [null, Validators.required],
    country: [null, Validators.required]
  });

  user: User;

  constructor(private fb: FormBuilder, private userService: UinfoService, private accountService: AccountService)
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.getprofile();
  }

  getprofile(){
    this.userService.getUserByEmail(this.user.email).subscribe(user => {
      this.profileForm.controls.firstName.setValue(user.firstName);
      this.profileForm.controls.lastName.setValue(user.lastName);
      this.profileForm.controls.birthDate.setValue(user.dateofBirth);
      this.profileForm.controls.telephone.setValue(user.telephone);
      this.profileForm.controls.country.setValue(user.country);
    })
  }

  onSubmit(){
    const _user: PutUser ={
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      dateofBirth : this.profileForm.get('birthDate').value,
      telephone: this.profileForm.get('telephone').value,
      country: this.profileForm.get('country').value,
      email: this.user.email
    }

    if(this.profileForm.invalid){
      alert('Favor revisar todos los campos.');
      return;
    }

    this.userService.UpdateProfile(_user).subscribe(response =>
      {
        this.profileForm.reset();
        alert('Datos almacenados');

      }, error =>
      {
        console.log(error);
      })
  }

}
