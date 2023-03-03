import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from "../../environments/environment"
import {User} from "../models/user"
import { UserEventRelation } from '../models/userEventRelation';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private FullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private userPayload: any;

  baseApiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private router:Router) {
    this.userPayload =  this.decodedToken();
   }


  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public getFullNameFromStore(){
    return this.FullName$.asObservable();
  }

  public setFullNameForStore(fullName:string){
    this.FullName$.next(fullName);
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/api/users');
  }

  registerUser(addUserRequest: User): Observable<User> {
    console.log(addUserRequest);
    return this.http.post<User>(this.baseApiUrl + '/api/users/register', addUserRequest);
  }

  addUserEventRelation(toAdd: UserEventRelation): Observable<UserEventRelation>{

    return this.http.put<UserEventRelation>(this.baseApiUrl + '/api/events/', toAdd);
    
  }

  loginUser(userRequest: any){
    return this.http.post<any>(this.baseApiUrl + '/api/users/authenticate', userRequest);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  storeToken(tokenValue: string){
    console.log(tokenValue);
    localStorage.setItem('token', tokenValue);
  }

  getToken(): any{
    console.log("getting a token from localstorage");
    return localStorage.getItem('token');
  }

  isLoggedIn() :boolean{
    return !!localStorage.getItem('token');
  }

  decodedToken(){
    const JwtHelper = new JwtHelperService();
    
    console.log(JwtHelper.decodeToken(this.getToken()))
    return JwtHelper.decodeToken(this.getToken());
  }

  getFullnameFromToken(){
    if(this.userPayload){
      return this.userPayload.name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }






}
