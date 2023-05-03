import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightPlan } from '../models/flight-plan.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightPlanService {
  

  constructor(private httpClient: HttpClient) {}
  
  saveFlightPlan(flightPlan: FlightPlan): Observable<any> {
    var apiUrl = 'http://129.153.95.231:5000/save_flight_plan';
    return this.httpClient.post(apiUrl, flightPlan);
  }

  executeFlightPlan(flightPlan: FlightPlan): Observable<any> {
    var apiUrl = 'http://129.153.95.231:5000/send_flight_plan';
    return this.httpClient.post(apiUrl, flightPlan);
  }
}