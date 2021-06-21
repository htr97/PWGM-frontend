import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { title } from 'node:process';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MaintenanceService } from '../services/maintenance.service';

@Component({
  selector: 'app-maintenance-calendar',
  templateUrl: './maintenance-calendar.component.html',
  styleUrls: ['./maintenance-calendar.component.css']
})
export class MaintenanceCalendarComponent implements OnInit {

  user: User;
  title = [];
  date = [];
  arr: Array<{title: string, date: Date}> =[]
  posts: any;

  constructor(private accountService: AccountService, private maintenanceService: MaintenanceService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.getData();
  }

  calendarOptions: CalendarOptions;

  getData(){
    this.maintenanceService.GetMaintenanceDates(this.user.email).subscribe(maintenance => {
      this.posts = maintenance;

      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this), // bind is important!
        events: [],
        eventColor: '#64DFDF'
      };

      this.calendarOptions.events = this.posts;
    })
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

}
