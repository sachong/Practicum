import { environment } from 'src/environments/environment';
import { AuthConfig, OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: environment.IssuerUri,
    clientId: environment.ClientId,
    requireHttps: false,
    redirectUri: location.origin + '/login-callback',
    silentRefreshRedirectUri: location.origin + '/silent-refresh.html',
    scope: environment.Scope,
    silentRefreshTimeout: 20000,
    timeoutFactor: 0.75,
    useSilentRefresh: true,
    showDebugInformation: environment.showDebugInfo, // Also requires enabling "Verbose" level in devtools
    // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
    clearHashAfterLogin: environment.clearHashAfterLogin,
    waitForTokenInMsec: environment.waitForToken,
    strictDiscoveryDocumentValidation: false, // Workaround for OIDC doc being at different endpoint than urls in doc
    dummyClientSecret: environment.ClientSecret,
    responseType: 'code',
    customQueryParams: {
        access_type: 'offline'
    }
};

export const authModuleConfig: OAuthModuleConfig = {
    resourceServer: {
        allowedUrls: [environment.ApiUri],
        sendAccessToken: true,
    }
};
