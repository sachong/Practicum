import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  appVersion: string;
  isDarkMode: boolean;
  currentYear: any;
  version : string = environment.version;

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.getDarkMode();
    this.getCurrentYear();
  }

  getDarkMode() {
    this.darkModeService.getDarkMode().subscribe(result => {
      this.isDarkMode = result;
    });
  }

  getCurrentYear() {
    this.currentYear = new Date().getFullYear();
  }
}
