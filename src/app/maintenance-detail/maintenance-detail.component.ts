import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.css']
})
export class MaintenanceDetailComponent implements OnInit {

  maintenanceForm = this.fb.group({
    descripcion: null,
    problema: [null, Validators.required],
    equipo: [null],
    tipoMantenimiento: ['free', Validators.required],
    tipoPrioridad: ['free', Validators.required],
    startDate: [Validators.required],
    endDate: [],
  });

  problema = [];
  user: User;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private problemService: ProblemService
    , private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  ngOnInit(): void {
    this.getProblem();
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  getProblem(){
    this.problemService.GetProblemByCompany(this.user.email).subscribe(problem => {
      this.problema = problem;
    })
  }

}
