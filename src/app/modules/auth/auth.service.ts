import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserContext } from 'src/app/models/user-context';
import { UserRoles } from 'src/app/models/user-roles';
import { OAuthService } from 'angular-oauth2-oidc';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$,
  ]).pipe(map((values) => values.every((b) => b)));

  private UserInstance: UserContext | null = null;
  private UserSubject = new BehaviorSubject<UserContext | null>(null);
  public User$ = this.UserSubject.asObservable();

  private userLoaded = false;
  get IsUserLoaded(): boolean {
    return this.userLoaded;
  }
  get User(): UserContext | null {
    return this.UserInstance;
  }

  private GetUser$() {
    if (!this.UserInstance) {
      this.isAuthenticated$.subscribe((val) => {
        if (val) {
          const claims: any = this.oauthService.getIdentityClaims();

          if (!!claims) {
            const user = new UserContext();

            user.UserID = claims.sub;
            user.Name = claims.name;
            user.Email = claims.email;
            user.UserRoleList.push(claims.role);

            this.UserInstance = user;
            this.UserSubject.next(this.UserInstance);
            this.userLoaded = true;
          }
        }
      });
    }
  }

  private navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  constructor(private oauthService: OAuthService, private router: Router) {
    window.addEventListener('storage', (event) => {
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      console.warn(
        'Noticed changes to access_token (most likely from another tab), updating isAuthenticated'
      );
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
      this.UserInstance = null;
      this.GetUser$();

      if (!this.oauthService.hasValidAccessToken()) {
        this.navigateToLoginPage();
      }
    });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
      this.UserInstance = null;
      this.GetUser$();
    });

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => {
        console.log('oauth token_recived', e);
        this.oauthService.loadUserProfile();
      });

    this.oauthService.events
      .pipe(
        filter((e) => ['session_terminated', 'session_error'].includes(e.type))
      )
      .subscribe((e) => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh({}, "any");
  }

  public runInitialLoginSequence(): Promise<void> {
    if (location.hash) {
      console.log('Encountered hash fragment, plotting as table...');
      console.table(
        location.hash
          .substr(1)
          .split('&')
          .map((kvp) => kvp.split('='))
      );
    }

    return (
      this.oauthService
        .loadDiscoveryDocument()

        // authorization workflow login
        .then(() => this.oauthService.tryLoginCodeFlow())

        .then(() => {
          if (this.oauthService.hasValidAccessToken()) {
            return Promise.resolve();
          }
          // silent refresh if cookie already exists in session that is valid
          return this.oauthService
            .silentRefresh()
            .then(() => Promise.resolve())
            .catch((result) => {
              // https://openid.net/specs/openid-connect-core-1_0.html#AuthError
              const errorResponsesRequiringUserInteraction = [
                'interaction_required',
                'login_required',
                'account_selection_required',
                'consent_required',
              ];

              if (
                result &&
                result.reason &&
                errorResponsesRequiringUserInteraction.indexOf(
                  result.reason.error
                ) >= 0
              ) {
                console.warn(
                  'User interaction is needed to log in, we will wait for the user to manually log in.'
                );
                return Promise.resolve();
              }

              return Promise.reject(result);
            });
        })

        .then(() => {
          this.isDoneLoadingSubject$.next(true);

          if (
            this.oauthService.state &&
            this.oauthService.state !== 'undefined' &&
            this.oauthService.state !== 'null'
          ) {
            let decodedState;
            if (this.oauthService.state.startsWith('%252F')) {
              //double decode
              decodedState = decodeURIComponent(
                decodeURIComponent(this.oauthService.state)
              );
            } else if (this.oauthService.state.startsWith('/')) {
              decodedState = decodeURIComponent(this.oauthService.state);
            } else {
              decodedState = this.oauthService.state;
            }

            console.log(
              'There was state, so we are sending you to: ' + decodedState
            );
            this.router.navigate([decodedState]);
          }
        })
        .catch(() => this.isDoneLoadingSubject$.next(true))
    );


  }

  public login(targetUrl?: string) {
    this.oauthService.initLoginFlow(
      encodeURIComponent(targetUrl || this.router.url)
    );
  }

  public logout() {
    this.oauthService.logOut();
  }
  public refresh() {
    this.oauthService.silentRefresh();
  }
  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }
  public get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }
  public get idToken() {
    return this.oauthService.getIdToken();
  }
  public get logoutUrl() {
    return this.oauthService.logoutUrl;
  }
  public get scopes() {
    return this.oauthService.getGrantedScopes();
  }

  public hasRoleAccess(requiredRoles: UserRoles[]): boolean {
    if (!this.identityClaims) {
      return false;
    }

    if (!requiredRoles) {
      return true;
    }

    // tslint:disable-next-line: no-string-literal
    const claims: string[] = (this.identityClaims as any)['role'] as string[];
    const hasRole = Array.isArray(claims)
      ? claims.filter((c) => requiredRoles.includes(c as UserRoles))
      : [claims].filter((c) => requiredRoles.includes(c as UserRoles));
    return hasRole.length > 0;
  }
}
