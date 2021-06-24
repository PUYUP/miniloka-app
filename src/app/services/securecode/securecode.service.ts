import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  InvokeSecureCode,
  ValidateSecureCode,
} from 'src/app/store/interfaces/securecode.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecureCodeService {
  constructor(private httpClient: HttpClient) {}

  // INVOKE
  doInvoke(data: InvokeSecureCode): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/person/v1/securecodes/', data)
      .pipe(map((response: any) => response));
  }

  // VALIDATE
  doValidate(data: ValidateSecureCode): Observable<any> {
    return this.httpClient
      .patch(
        environment.baseUrl +
          '/api/person/v1/securecodes/' +
          data?.passcode +
          '/',
        data
      )
      .pipe(map((response: any) => response));
  }
}
