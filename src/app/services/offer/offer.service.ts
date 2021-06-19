import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param next
   */
  public doList(params: any = {}): Observable<any> {
    const next = params?.next;
    const inquiryUuid = params?.inquiry_uuid;

    let url =
      environment.baseUrl +
      '/api/procure/v1/inquiries/' +
      inquiryUuid +
      '/offers/';
    if (next) url = next;

    let httpParams = new HttpParams();

    return this.httpClient
      .get(url, { params: httpParams })
      .pipe(map((response) => response));
  }
}
