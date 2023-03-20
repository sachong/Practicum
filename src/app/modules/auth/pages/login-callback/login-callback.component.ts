import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DarkModeService } from '@services/dark-mode.service';
import { takeUntil } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.sass']
})
export class LoginCallbackComponent implements OnInit, OnDestroy {
  stream: Subscription = new Subscription();
  private redirectUri = '';

  isDarkMode: boolean = false;

  private unsubscribe = new Subject();

  constructor(private authService: AuthService,
              private router: Router,
              private darkModeService: DarkModeService, 
              private oauthService: OAuthService) { }

    public ngOnInit() {
      this.getDarkMode();
      this.stream = this.authService.canActivateProtectedRoutes$.subscribe(yes => {
        console.log('callback auth stream check',  yes);
          return this.router.navigate([`${environment.DefaultRoute}`]); 
      });
  }

  public ngOnDestroy() {
      this.stream.unsubscribe();
  }

  getDarkMode() {
    this.darkModeService.getDarkMode().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      this.isDarkMode = result;
    });
  }


}
