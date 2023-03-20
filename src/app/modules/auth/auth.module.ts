import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {
    AuthConfig,
    OAuthModule,
    OAuthModuleConfig,
    OAuthStorage,
    ValidationHandler,
} from 'angular-oauth2-oidc';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { authConfig, authModuleConfig } from './auth.config';
import { throwIfAlreadyLoaded } from 'src/app/modules/module-import-guard';

import { LoginComponent } from './pages/login/login.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@modules/layout/layout.component';
import { ContentModule } from '@modules/content/content.module';
import { MapComponent } from '@modules/content/pages/map/map.component';
import { GoogleSigninSplashComponent } from './pages/google-signin-splash/google-signin-splash.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login-callback', component: LoginCallbackComponent },
    { path: 'sign-in', component: GoogleSigninSplashComponent, pathMatch: 'full'},
];

export function storageFactory(): OAuthStorage {
    return localStorage;
}

@NgModule({
    imports: [
        HttpClientModule,
        OAuthModule.forRoot(),
        RouterModule.forChild(routes),
        CommonModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
    ],
    declarations: [
        LoginComponent,
        LoginCallbackComponent,
        GoogleSigninSplashComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                { provide: AuthConfig, useValue: authConfig },
                { provide: OAuthModuleConfig, useValue: authModuleConfig },
                { provide: OAuthStorage, useFactory: storageFactory },
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
        throwIfAlreadyLoaded(parentModule, 'AuthModule');
    }
}
