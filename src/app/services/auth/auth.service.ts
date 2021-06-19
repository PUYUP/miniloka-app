import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LoginCredential,
  Token,
} from 'src/app/store/interfaces/auth.interfaces';
import { environment } from 'src/environments/environment';

const CREDENTIAL = '@credential';
const TOKEN = '@token';
const USER = '@user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

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
   * @param verifycode_email
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
}
