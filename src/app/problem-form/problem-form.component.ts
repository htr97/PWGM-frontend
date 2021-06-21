import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { PostProblem } from '../models/post-problem';
import { Problem } from '../models/problem';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ProblemService } from '../services/problem.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.css']
})
export class ProblemFormComponent {
  problemForm = this.fb.group({
    Name: [null, Validators.required],
    Description: [null, Validators.required],
  })

  user: User;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private accountService: AccountService,
    private problemService: ProblemService, private _snackBar: MatSnackBar) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  onSubmit(){
    const problem: PostProblem ={
      name: this.problemForm.get('Name').value,
      description: this.problemForm.get('Description').value,
      userEmail: this.user.email
    }

    if(this.problemForm.invalid){
      this._snackBar.open('Formulario incompleto','Aceptar',{duration: 2000});
      return
    }

    this.problemService.PostProblemByCompany(problem).subscribe(response =>
      {
        console.log(problem);
        this.problemForm.reset();
        this._snackBar.open('Datos almacenados','Aceptar',{duration: 2000});
        this.dialog.closeAll();
      }, error =>
      {
        console.log(error);
      })
  }

}

