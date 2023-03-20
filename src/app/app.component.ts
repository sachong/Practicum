import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isDarkMode : boolean;
  title = 'DroneSPA';

  constructor(private authService: AuthService, private darkModeService: DarkModeService) {
    
    this.authService.runInitialLoginSequence();
    this.getDarkMode();
  }

  getDarkMode() {
    // We have to manually add the dark theme mode class to the body since the darkModeservice cannot access the body tag
    this.darkModeService.getDarkMode().subscribe(result => {
      this.isDarkMode = result;
      let body = document.getElementsByTagName('body')[0];
      if (this.isDarkMode) {
        body.classList.add("dark-theme-mode");
      } else {
        body.classList.remove("dark-theme-mode"); 
      }
    });
  }
}