import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import {Event} from '../models/event';
import { EventsService } from '../services/events.service';
import { UsersService } from '../services/users.service';
import {UserEventRelation} from '../models/userEventRelation';

@Component({
  selector: 'app-register-to-event',
  templateUrl: './register-to-event.component.html',
  styleUrls: ['./register-to-event.component.css']
})
export class RegisterToEventComponent {


  addUserRequest: User = {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    malev: ''
  }

  eventDetails: Event = {
    id: '',
    title: '',
    description: '',
    imgUrl: '',
    date: '',
    instructor: '',
    location: '',
    type: '',
    cost: '',
    value: 0,
  }

  toAdd: UserEventRelation = {
    userId: '',
    eventId: ''
  }
  constructor(private userService: UsersService, private router:Router, private eventService: EventsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.eventService.getEvent(id)
          .subscribe({
            next: (response) => {
              this.eventDetails = response
            }
          });

        }
      }
    })
  }

  // updateUser(){
  //   this.userService.addUser(this.addUserRequest)
  //     .subscribe({
  //     next: (user) => {
  //       this.router.navigate(['events']);

  //       console.log(user);
  //     }
  //   });
    
  // }

  updateRelation(){
    // Get the data of the current user
    this.toAdd.userId = '00000000-0000-0000-0000-000000000000';
    this.toAdd.eventId = this.eventDetails.id;
    this.userService.addUserEventRelation(this.toAdd).subscribe({
      next: () => {
        this.router.navigate(['events']);
      }
    });
  }


}
