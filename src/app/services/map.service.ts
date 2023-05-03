import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { map, Observable } from 'rxjs';
import { FlightPlan } from '../models/flight-plan.model';


@Injectable({
  providedIn: 'root',
})

export class MapService {
    constructor (private httpClient: HttpClient){} 

    getLocations(): Observable<Location[]> {
        var apiUrl = 'http://129.153.95.231:5000/locations';
        return this.httpClient.get<Location[]>(apiUrl).pipe(
          map(locations => locations.map(location => ({
            id: location.id,
            name: location.name,
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: location.zoom
            
          })))
        );
      }
    }

    // getPaths(): Observable<FlightPlans[]> {
    //         var apiUrl = 'http://127.0.0.1:5000/paths';
    //         return this.httpClient.get<FlightPlans[]>(apiUrl).pip(
    //           map(paths => paths.map(path =>({
    //             // TODO: map to model
      
    //           }))
      
    //         )
    //       }