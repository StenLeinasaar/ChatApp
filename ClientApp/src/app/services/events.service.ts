import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment"
import {Event} from "../models/event"

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseApiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseApiUrl + '/api/events');
  }

  addEvent(addEventRequest: Event): Observable<Event> {
    addEventRequest.id = '00000000-0000-0000-0000-000000000000';
    console.log(addEventRequest);
    return this.http.post<Event>(this.baseApiUrl + '/api/events', addEventRequest);
  }

  getEvent(id:string): Observable<Event> {
    return this.http.get<Event>(this.baseApiUrl + '/api/events/' + id);
  }
}
