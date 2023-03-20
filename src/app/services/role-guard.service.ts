import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@modules/auth/auth.service';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private roleService: RoleService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean|UrlTree> {
    return this.roleService.hasAccess(route.data.requiredRoles)
    .pipe(
      map((hasAccess: any) => {
        if (hasAccess) {
          return true
        }
        return this.router.parseUrl('/timebyday')
    }))
  }
}