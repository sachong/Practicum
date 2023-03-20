import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserRoles } from '@models/user-roles';
import { AuthService } from '@modules/auth/auth.service';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private rolesSubject$: ReplaySubject<string[]> = new ReplaySubject<string[]>()
  roles$: Observable<string[]> = this.rolesSubject$.asObservable()
  

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.isAuthenticated$.subscribe(() => {
      this.getRoles().subscribe(roles => {
        this.rolesSubject$.next(roles)
      })
    })
  }

  private getRoles(): Observable<string[]> {
    return this.http.get<string[]>(environment.ApiUri + '/api/roles/getMyRoles').pipe(catchError(err => of([])))
  }

  getAvailableRoles(): Observable<string[]> {
    return this.http.get<string[]>(environment.ApiUri + '/api/roles')
  }

  hasAccess(checkRoles: UserRoles[]): Observable<boolean> {
    return this.roles$.pipe(map(roles => {
      return this.accessCheck(roles, checkRoles)
    }))
  }

  private accessCheck(roles: string[], checkRoles: UserRoles[]): boolean {
      if (roles.includes( (UserRoles.SysAdmin as string) )) {
        return true
      }

      //Case for pages that don't need a role
      if (!checkRoles || Object.keys(checkRoles).length == 0) {
        return true
      }

      for (let i: number = 0; i < checkRoles.length; i++) {
        if (roles.includes( (checkRoles[i] as string) )) {
          return true
        }
      }
        return false
  } 
}
