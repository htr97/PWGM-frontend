import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Resumen mantenimientos', cols: 1, rows: 1 },
          { title: 'Mantenimientos correctivos', cols: 1, rows: 1 },
          { title: 'Mantenimientos preventivos', cols: 1, rows: 1 },
          { title: 'Horas no productivas', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Resumen mantenimientos', cols: 2, rows: 1 },
        { title: 'Mantenimientos correctivos', cols: 1, rows: 1 },
        { title: 'Mantenimientos preventivos', cols: 1, rows: 1 },
        { title: 'Horas no productivas', cols: 2, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
