import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class MapService {
    constructor (private httpClient: HttpClient){} 

    getLocations(): Observable<Location[]> {
        var apiUrl = 'http://127.0.0.1:5000/locations';
        return this.httpClient.get<Location[]>(apiUrl).pipe(
          map(locations => locations.map(location => ({
            id: location.id,
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: location.zoom,
            name: location.name
          })))
        );
      }
    }
