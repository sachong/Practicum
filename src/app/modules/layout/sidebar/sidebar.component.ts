import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { UserRoles } from 'src/app/models/user-roles';
import { LayoutService } from 'src/app/services/layout.service';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import DxThemes from 'devextreme/ui/themes';
import { UserContext } from 'src/app/models/user-context';
import { LoginComponent } from '@modules/auth/pages/login/login.component';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleAuthService } from '@services/google-auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { RoleService } from '@services/role.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedNodeID: number;
  public isInvoiceCollapsed = true;
  public isTimeAdminCollapsed = true;
  public isQBImportsCollapsed = true;
  private logincomp = LoginComponent; 

  path: string;
  user = new UserContext();
  UserRoles = UserRoles;
  color: ThemePalette = 'primary';
  isDarkMode : boolean;

  constructor(private router: Router,
              public layoutService: LayoutService,
              public authService: AuthService,
              private darkModeService: DarkModeService,
              private googleService: GoogleAuthService,
              private oauthService: OAuthService,
              private roleService: RoleService) {}

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getDarkMode();
    if(this.layoutService.isScreenTooSmall){
      this.layoutService.isSidebarUserHidden = false;
    }
    
  }

  setDarkMode() {
    this.darkModeService.setDarkMode(this.isDarkMode);
    DxThemes.current(DxThemes.current() === 'generic.light' ? 'generic.dark' : 'generic.light');
  }

  getDarkMode() {
    this.darkModeService.getDarkMode().subscribe(result => {
      this.isDarkMode = result;
    });
  }

  routeCheck(route: string) {
    return (this.router.url === '/' + route);
  }

  getLoggedInUser() {
    this.authService.User$.subscribe(data => {
      this.user = data;
    });
  }


  onLogoutClicked() {
    // this.authService.logout();
    this.googleService.signOut(); 
    this.oauthService.logOut(); 
    // this.router.navigateByUrl('/login');
    
  }

  onToggleSidebar() {
    this.layoutService.isSidebarUserHidden = !this.layoutService.isSidebarUserHidden;
    window.dispatchEvent(new Event('resize'));
  }

  navigateDashboard() {
    window.open(environment.DefaultRoute);
  }
}
