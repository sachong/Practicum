import { Injectable } from '@angular/core';
import ODataContext from 'devextreme/data/odata/context';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class OdataContextService {
  public oDataContext: ODataContext;

  constructor(private authService: AuthService, private oauthService: OAuthService) {
    this.oDataContext = new ODataContext({
      url: environment.ApiUri + '/odata',
      version: 4,
      errorHandler(error) {
          // console.log('odata context error', error);
          if (error.httpStatus === 401) {
              authService.logout();
          }
      },
      beforeSend(options) {
        // console.log('id token', oauthService.getIdToken());
          options.headers = {
              Authorization: 'Bearer ' + oauthService.getIdToken()
          };
      },
      entities: {
        
      }
    });
  }

  get context(): any {
    return this.oDataContext;
  }
}
