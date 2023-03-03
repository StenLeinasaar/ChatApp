import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public fullName:string = "";

  constructor(private userService:UsersService){

  }

  ngOnInit(){
    this.userService.getFullnameFromToken()
      .subscribe((val: any) => {
        let fullNameFromToken = this.userService.getFullnameFromToken();
        this.fullName = val || fullNameFromToken;
      })
  }



}
