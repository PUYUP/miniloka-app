import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   *
   * @returns object
   */
  public logout(): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/person/v1/users/logout/', {})
      .pipe(map((response: any) => response));
  }

  /**
   * Get user from localStorage
   */
  public getUser(): Observable<any> {
    return this.httpClient
      .get(environment.baseUrl + '/api/person/v1/users/me/')
      .pipe(map((response: any) => response));
  }

  /**
   *
   * @param first_name
   * @param address
   * @param headline
   * @param about
   */
  public updateProfile(context: any): Observable<any> {
    return this.httpClient
      .patch(
        environment.baseUrl +
          '/api/person/v1/users/' +
          this.authService.user.uuid +
          '/profile/',
        { ...context }
      )
      .pipe(map((response: any) => response));
  }

  /**
   * Update user security
   * @param username
   * @param email
   * @param msisdn
   * @param verification
   */
  public updateSecurity(context: any): Observable<any> {
    return this.httpClient
      .patch(
        environment.baseUrl +
          '/api/person/v1/users/' +
          this.authService.user.uuid +
          '/',
        {
          ...context,
        }
      )
      .pipe(map((response: any) => response));
  }
}
