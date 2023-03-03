import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users: User[] = [];
  constructor(private userService: UsersService){

  }

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe(res => {
        this.users = res;
      })
  }

  logout(){
    this.userService.logout();
  }
  

}
