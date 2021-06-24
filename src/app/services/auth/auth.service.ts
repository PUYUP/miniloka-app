import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import {
  LoginCredential,
  Token,
} from 'src/app/store/interfaces/auth.interfaces';
import { environment } from 'src/environments/environment';
import { PersonService } from '../person/person.service';

const CREDENTIAL = '@credential';
const TOKEN = '@token';
const USER = '@user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private firebaseX: FirebaseX) {}

  public storeCredential(credential: any) {
    localStorage.setItem(CREDENTIAL, JSON.stringify(credential));
  }

  public clearCredential() {
    localStorage.removeItem(CREDENTIAL);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }

  public updateCredential(key: string, value: any) {
    let credential = this.credential;
    if (!credential) {
      credential[key] = value;
      credential = JSON.stringify(credential);
      this.storeCredential(credential);
    }
  }

  get credential() {
    let credential = localStorage.getItem(CREDENTIAL);
    if (credential) return JSON.parse(credential);
    return null;
  }

  get token() {
    let token = localStorage.getItem(TOKEN);
    return token && token != 'undefined' ? JSON.parse(token) : null;
  }

  get isAuthenticated(): boolean {
    return this.token && this.token != 'null' ? true : false;
  }

  get user() {
    let user = localStorage.getItem(USER);
    return user && user != 'undefined' ? JSON.parse(user) : null;
  }

  public storeToken(token: Token) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
  }

  public storeUser(user: any) {
    localStorage.setItem(USER, JSON.stringify(user));

    // generate and save fcm token
    this.generateFcmToken();
  }

  // LOGIN
  login(credential: LoginCredential): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/person/v1/token/', credential)
      .pipe(map((response: any) => response));
  }

  /**
   * Create user
   * @param first_name
   * @param username
   * @param email
   * @param password
   * @param retype_password
   */
  public register(credential: any): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/person/v1/users/', credential)
      .pipe(map((response: any) => response));
  }

  /**
   * Recovery password
   *
   * @param new_password
   * @param retype_password
   * @param securecode_email
   * @param password_token
   * @param password_uidb64
   */
  public passwordRecovery(credential: any): Observable<any> {
    return this.httpClient
      .post(
        environment.baseUrl + '/api/person/v1/users/password-recovery/',
        credential
      )
      .pipe(map((response: any) => response));
  }

  /**
   * Save user meta
   */
  async doSaveUserMeta(meta = {}) {
    let url =
      environment.baseUrl +
      '/api/person/v1/users/' +
      this.user.uuid +
      '/metas/';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token?.access}`,
      },
      body: JSON.stringify(meta),
    });

    return response.json();
  }

  /**
   * Generate fcm token
   */
  public generateFcmToken() {
    this.firebaseX
      .getToken()
      .then((token) => {
        let context = {
          meta_key: 'fcm_token',
          meta_value: token,
        };

        this.doSaveUserMeta(context).then((data) => {
          // console.log(data);
        });
      }) // save the token server-side and use it to push notifications to this device
      .catch((error) => console.error('Error getting token', error));

    this.firebaseX.onTokenRefresh().subscribe((token: string) => {
      let context = {
        meta_key: 'fcm_token',
        meta_value: token,
      };

      this.doSaveUserMeta(context).then((data) => {
        // console.log(data);
      });
    });
  }
}
