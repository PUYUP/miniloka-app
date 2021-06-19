import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvokeVerifycode, ValidateVerifycode } from 'src/app/store/interfaces/verifycode.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VerifycodeService {
  constructor(private httpClient: HttpClient) {}

  // INVOKE
  doInvoke(data: InvokeVerifycode): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/person/v1/verifycodes/', data)
      .pipe(map((response: any) => response));
  }

  // VALIDATE
  doValidate(data: ValidateVerifycode): Observable<any> {
    return this.httpClient
      .patch(environment.baseUrl + '/api/person/v1/verifycodes/' + data?.passcode + '/', data)
      .pipe(map((response: any) => response));
  }
}
