import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UsersService, private router: Router) {

  }
  canActivate(): boolean{

    if(this.userService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(["login"]);
      return false;
    }
  }
  
}
