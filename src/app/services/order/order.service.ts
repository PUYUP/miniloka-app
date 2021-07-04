import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/store/interfaces/order.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  // CREATE
  public doCreate(data: Order): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/procure/v1/orders/', data)
      .pipe(map((response: any) => response));
  }

  // UPDATE
  public doUpdate(data: Order, uuid: string): Observable<any> {
    return this.httpClient
      .patch(environment.baseUrl + '/api/procure/v1/orders/' + uuid + '/', data)
      .pipe(map((response: any) => response));
  }

  // DELETE
  public doDelete(uuid: string): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + '/api/procure/v1/orders/' + uuid + '/')
      .pipe(map((response: any) => response));
  }

  // RETRIEVE
  public doRetrieve(uuid: string): Observable<any> {
    return this.httpClient
      .get(environment.baseUrl + '/api/procure/v1/orders/' + uuid + '/')
      .pipe(map((response: any) => response));
  }

  // GET PROPOSES
  public doGetPropose(uuid: string): Observable<any> {
    return this.httpClient
      .get(
        environment.baseUrl + '/api/procure/v1/orders/' + uuid + '/proposes/'
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

    let url = environment.baseUrl + '/api/procure/v1/orders/';
    if (next) url = next;

    let httpParams = new HttpParams();
    if (obtain) httpParams = httpParams.set('obtain', obtain);
    if (keyword) httpParams = httpParams.set('keyword', keyword);

    return this.httpClient
      .get(url, { params: httpParams })
      .pipe(map((response) => response));
  }
}
