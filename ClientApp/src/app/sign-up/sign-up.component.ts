import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock, faEye, faEyeSlash, faEnvelope, faHouse} from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import ValidateForm from '../helpers/validateForm';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  type:string = "password";
  isText: boolean = false;
  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEnvelope = faEnvelope;
  faHouse = faHouse;

  addUserRequest: User = {
    id: '',
    firstName: '',
    lastName: '',
    username:'',
    password: '',
    email: '',
    malev: ''
  };

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router:Router) {}

  

  ngOnInit(){
    this.registrationForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      malev:['', Validators.required],
      username: ['', Validators.required ],
      password: ['', Validators.required]
    })
  }


  hideShowPassword(){

    this.isText = !this.isText
    this.isText ? this.faEye = faEyeSlash : this.faEye = faEye;
    this.isText ? this.type = "text" : this.type = "password";

  }


  registerUser(){

    if(this.registrationForm.valid){
      //send the object to database
      console.log("Going to authenticate");
      // It will be added in the backend later
      this.addUserRequest.id = '00000000-0000-0000-0000-000000000000';
      this.userService.registerUser(this.addUserRequest)
      .subscribe({
      next: (user) => {
        console.log(user)
        this.router.navigate(['login']);

      }
    });
    }else{
      //throw an error using toaster and with required field. 
      ValidateForm.validateAllFormFields(this.registrationForm);
      alert("Invalid");
    }
    
    
  }

}
