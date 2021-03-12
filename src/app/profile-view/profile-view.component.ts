import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Uinfo } from '../models/uinfo';
import { UinfoService } from '../services/uinfo.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: Uinfo;

  constructor(private UinfoService: UinfoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.UinfoService.getUser(this.route.snapshot.paramMap.get('username')).subscribe(user => {this.user = user; })
  }

}
