import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Partner } from 'src/app/store/interfaces/partner.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  constructor(private httpClient: HttpClient) {}

  // RETRIEVE
  public doRetrieve(uuid: string): Observable<any> {
    return this.httpClient
      .get(environment.baseUrl + '/api/procure/v1/listings/' + uuid + '/')
      .pipe(map((response: any) => response));
  }

  /**
   *
   * @param next
   */
  public doList(params: any = {}): Observable<any> {
    const next = params?.next;
    const obtain = params?.obtain;
    const keyword = params?.keyword;
    const visibility = params?.visibility;
    const coordinate = params?.coordinate;

    console.log(params);

    let url = environment.baseUrl + '/api/procure/v1/listings/';
    if (next) url = next;

    let httpParams = new HttpParams();
    if (obtain) httpParams = httpParams.set('obtain', obtain);
    if (keyword) httpParams = httpParams.set('keyword', keyword);
    if (visibility) httpParams = httpParams.set('visibility', visibility);
    if (coordinate) {
      httpParams = httpParams.set('latitude', coordinate?.latitude);
      httpParams = httpParams.set('longitude', coordinate?.longitude);
    }

    return this.httpClient
      .get(url, { params: httpParams })
      .pipe(map((response) => response));
  }
}
