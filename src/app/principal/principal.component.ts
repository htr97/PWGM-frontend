import { Component, ContentChildren } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ProblemViewComponent } from '../problem-view/problem-view.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {


  constructor(private breakpointObserver: BreakpointObserver) {}
}
