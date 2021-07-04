import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Listing } from 'src/app/store/interfaces/listing.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  constructor(private httpClient: HttpClient) {}

  // CREATE
  public doCreate(data: Listing): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/procure/v1/listings/', data)
      .pipe(map((response: any) => response));
  }

  // UPDATE
  public doUpdate(data: Listing, uuid: string): Observable<any> {
    return this.httpClient
      .patch(
        environment.baseUrl + '/api/procure/v1/listings/' + uuid + '/',
        data
      )
      .pipe(map((response: any) => response));
  }

  // DELETE
  public doDelete(uuid: string): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + '/api/procure/v1/listings/' + uuid + '/')
      .pipe(map((response: any) => response));
  }

  // RETRIEVE
  public doRetrieve(uuid: string): Observable<any> {
    return this.httpClient
      .get(environment.baseUrl + '/api/procure/v1/listings/' + uuid + '/')
      .pipe(map((response: any) => response));
  }

  // SET DEFAULT
  public doSetDefault(uuid: string): Observable<any> {
    return this.httpClient
      .post(
        environment.baseUrl +
          '/api/procure/v1/listings/' +
          uuid +
          '/set-default/',
        {}
      )
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

    let url = environment.baseUrl + '/api/procure/v1/listings/';
    if (next) url = next;

    let httpParams = new HttpParams();
    if (obtain) httpParams = httpParams.set('obtain', obtain);
    if (keyword) httpParams = httpParams.set('keyword', keyword);
    if (visibility) httpParams = httpParams.set('visibility', visibility);

    return this.httpClient
      .get(url, { params: httpParams })
      .pipe(map((response) => response));
  }

  /**
   *
   * @param street_address
   * @param administrative_area_level_1
   * @param administrative_area_level_2
   * @param administrative_area_level_3
   * @param administrative_area_level_4
   * @param postal_code
   * @param latitude
   * @param longitude
   */
  public doUpdateLocation(
    listingUuid: string,
    params: any = {}
  ): Observable<any> {
    return this.httpClient
      .patch(
        environment.baseUrl +
          '/api/procure/v1/listings/' +
          listingUuid +
          '/location/',
        params
      )
      .pipe(map((response) => response));
  }

  /**
   * Geocoing...
   */
  async geocoding(postal_code: any, province: string) {
    let query = postal_code + '%20' + province;
    let url =
      'https://nominatim.openstreetmap.org/search/' +
      query +
      '?format=json&addressdetails=1&limit=1&polygon_svg=1';

    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }
}
