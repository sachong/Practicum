import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '@modules/auth/auth.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MapService } from './map.service';





@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private oauthService: OAuthService, 
    private authService: AuthService, 
    private router: Router, 
    private httpClient: HttpClient, 
    private mapService: MapService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Check for origin token 
    if (req.url.startsWith("https://accounts.google.com") || req.url.startsWith("https://openidconnect.googleapis.com")) {
      return next.handle(req); 
    } 
    //override for API calls
    else {
      var token = this.oauthService.getIdToken(); 
      //only refresh token if login flow has finalized and user id is set
      if (token == null && this.mapService.analystId !== null && this.mapService.analystId !== undefined) {
        console.log('INTERCEPTOR - id token exp or null, refreshing');
        this.oauthService.refreshToken();
      }

      token = this.oauthService.getIdToken(); 

      const request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(request); 
    }
  }
}
