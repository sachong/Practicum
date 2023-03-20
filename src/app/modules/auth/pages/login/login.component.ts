import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { async, Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DarkModeService } from '@services/dark-mode.service';
import { map, takeUntil } from 'rxjs/operators';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { OAuth2Client } from 'google-auth-library';
import { MapService } from '@services/map.service';
// import { GoogleToken } from '@models/google-token';
import { GoogleAuthService } from '@services/google-auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  private stream: Subscription = new Subscription();
  private redirectUri = '';

  isDarkMode: boolean = false;

  private unsubscribe = new Subject();
  currentUserTokenSubject: any;

  constructor(private authService: AuthService,
              private router: Router,
              private darkModeService: DarkModeService,
              private socialAuthService: SocialAuthService, 
              private http: HttpClient, 
              private MapService: MapService, 
              private googleService: GoogleAuthService, 
              private oauthService: OAuthService) { }

  public async ngOnInit() {

    this.getDarkMode();


    this.stream = this.authService.canActivateProtectedRoutes$.subscribe(yes => {
      setTimeout(async _ => {
      if (yes ) {
          console.log('can login', yes);

          if (this.redirectUri !== '') {
            localStorage.removeItem('login_redirect');
            this.router.navigateByUrl(this.redirectUri);
          }        
          else {
            console.log('authToken before reroute', this.oauthService.getIdToken());
            this.router.navigate([`${environment.DefaultRoute}`]);
          }

        } else {
          console.log('sending to login-callback', yes);

          // SetTimeout for redirecting from not signed in routes.
          //Chrome would not render the page if redirected from routes that were not signed in
          setTimeout(() => this.authService.login('/login-callback'), 300)
  
          //original route
          //this.router.navigateByUrl('/timebyday');
        }
      }, 0);
    });
  }

  public ngOnDestroy() {
    if (!!this.stream) {
      this.stream.unsubscribe();
    }
  }

  public login() {
    this.authService.login('/test');
  }

  getDarkMode() {
    this.darkModeService.getDarkMode().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      this.isDarkMode = result;
    });
  }

}
