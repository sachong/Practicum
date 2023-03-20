import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class MapService {
 
    analystId: number | null; 
    dtFromMap: Date; 
    headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.oauthService.getIdToken());

    constructor(private httpClient: HttpClient, private oauthService: OAuthService) { }


    DeleteMap(UserID: number, MapID : number) {
        return this.httpClient.delete(environment.ApiUri + '' + UserID + '' + MapID);
    }
}
