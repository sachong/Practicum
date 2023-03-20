import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { GoogleToken } from '@models/google-token';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public user: SocialUser = new SocialUser;
  public authToken; 
  public idToken; 
  tokenVerified: boolean;

  constructor(private httpClient: HttpClient,
              private socialAuthService: SocialAuthService, 
              private router: Router) { }

  ValidateGoogleToken(auth_token: any) {
    return this.httpClient.post('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+auth_token, '');
  }

  public getUser(pullToken?: boolean) {
    console.log('before sub'); 
    this.signInWithGoogle(); 
    this.socialAuthService.authState.subscribe(async user => {
      if (!user || user == null || user == undefined) {
        //USERS NOT SIGNED IN 
        await this.signInWithGoogle(); 
      } else {
        this.user = user;
        this.authToken = user.authToken; 
        this.idToken = user.idToken; 
        // console.log('user!', user);
        // console.log('authtok', this.authToken); 
        // console.log('idtoke', this.idToken); 
        this.verifyGoogleToken(); 
        return true; 
      }
      console.log('getting user?');
      this.signInWithGoogle(); 
      return true; 
    }); 
    return true; 
  }

  public signInWithGoogle(): void {
    console.log('inside signin');
    console.log(GoogleLoginProvider.PROVIDER_ID); 

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOut(): void {
    this.socialAuthService.signOut(true);

    this.user = null; 
    this.idToken = null; 
    this.authToken = null; 
    this.tokenVerified = false; 
    console.log('signed out!', this.user); 
    this.router.navigateByUrl('/login');
  }

  public verifyGoogleToken() {
    // console.log('auth token b4 post', this.authToken);

    //If google authToke has not been set 
    if (!this.authToken || this.authToken == '' || this.authToken == undefined) {
      this.router.navigateByUrl('/sign-in'); //Google sign in 
      this.getUser(); 
    } else {
      this.ValidateGoogleToken(this.authToken).subscribe(
        (res: GoogleToken) => {
          if (res.audience == environment.ClientId && res.verified_email == true && res.expires_in > 0) {
            // console.log("YES");
            this.tokenVerified = true; 
            this.router.navigateByUrl('/map'); 
          } else {
            console.log("NO", res); 
          }
        });
    } 
  }

}
