import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Event } from "../models/event"
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  addEventRequest: Event = {
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
  constructor(private eventService: EventsService, private router:Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addEvent(){
    this.eventService.addEvent(this.addEventRequest)
      .subscribe({
      next: (event) => {
        this.router.navigate(['events']);

        console.log(event);
      }
    });
    
  }

  

}
