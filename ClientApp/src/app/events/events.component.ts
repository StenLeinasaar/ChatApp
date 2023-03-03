import { Component, OnInit } from '@angular/core';
import {Event} from '../models/event'
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  events: Event[] = [];
 

  constructor(private eventsService: EventsService) { }

  ngOnInit():void {

    this.eventsService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  

}
