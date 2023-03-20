import { Component, OnInit } from '@angular/core';
import { UserContext } from 'src/app/models/user-context';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = new UserContext();

  constructor(public layoutService: LayoutService, public authService: AuthService) {}

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  onToggleSidebar() {
    this.layoutService.isSidebarUserHidden = !this.layoutService.isSidebarUserHidden;
    if(this.layoutService.isScreenTooSmall){ //used to directly manipulate the toggling button in mobile view
      this.layoutService.isSidebarToggled = !this.layoutService.isSidebarToggled;
    }

    window.dispatchEvent(new Event('resize'));
  }

  logout() {
    this.authService.logout();
  }

  getLoggedInUser() {
    this.authService.User$.subscribe(data => {
      this.user = data;
    });
  }
}
