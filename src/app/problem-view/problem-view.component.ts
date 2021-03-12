import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Problem } from '../models/problem';
import { User } from '../models/user';
import { ProblemFormComponent } from '../problem-form/problem-form.component';
import { AccountService } from '../services/account.service';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.css']
})
export class ProblemViewComponent implements OnInit {
  baseUrl = environment.apiUrl;
  user: User;
  ELEMENT_DATA: Problem[];
  displayedColumns: string[] = ['name','description',"actions"];
  dataSource = new MatTableDataSource<Problem>(this.ELEMENT_DATA);

  constructor(private http: HttpClient, private accountService: AccountService, private problemService: ProblemService,
    private dialog: MatDialog) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getProblem();
  }

  getProblem(){
    this.problemService.GetProblemByCompany(this.user.email).subscribe(problem => {
      this.dataSource.data = problem;
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(ProblemFormComponent,dialogConfig);
  }
}
