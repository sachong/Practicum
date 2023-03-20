import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '@services/dark-mode.service';
import { GoogleAuthService } from '@services/google-auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-google-signin-splash',
  templateUrl: './google-signin-splash.component.html',
  styleUrls: ['./google-signin-splash.component.scss']
})
export class GoogleSigninSplashComponent implements OnInit {
  isDarkMode: boolean = false;
  private unsubscribe = new Subject();

  constructor(private darkModeService: DarkModeService, 
              private googleService: GoogleAuthService) { }

  ngOnInit(): void {
    this.getDarkMode();
  }

  getDarkMode() {
    this.darkModeService.getDarkMode().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      this.isDarkMode = result;
    });
  }

}
