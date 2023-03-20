import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of} from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { UserRoles } from 'src/app/models/user-roles';
import { Url } from 'url';
import { RoleService } from '@services/role.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  private isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) {
    this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean|UrlTree> {
    return this.authService.isDoneLoading$.pipe(
      concatMap(_ => this.authService.isAuthenticated$),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true
        }
        return this.router.parseUrl('/login')
      })
    )
  }
}
