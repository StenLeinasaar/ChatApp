import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ValidateForm from '../helpers/validateForm';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type:string = "password";
  isText: boolean = false;
  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  loginForm! : FormGroup;
  toAuthenticate: User ={
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    malev: ''
  }

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
    })
  }

  hideShowPassword(){

    this.isText = !this.isText
    this.isText ? this.faEye = faEyeSlash : this.faEye = faEye;
    this.isText ? this.type = "text" : this.type = "password";

  }

  authenticateUser(){
    if(this.loginForm.valid){
      this.toAuthenticate.username = this.loginForm.value.username;
      this.toAuthenticate.password = this.loginForm.value.password;
      this.toAuthenticate.id = '00000000-0000-0000-0000-000000000000';
      this.userService.loginUser(this.toAuthenticate)
      .subscribe({
      next: (res) => {
        console.log(res.token);
        this.userService.storeToken(res.token);
        this.router.navigate(['dashboard']);

      }
    });
    }else{
      //throw an error using toaster and with required field. 
      console.log("Invalid");
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Invalid");
    }
    
  }


}
