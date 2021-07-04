import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/store/interfaces/product.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  // CREATE
  public doCreate(data: Product): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + '/api/procure/v1/products/', data)
      .pipe(map((response: any) => response));
  }

  // UPDATE
  public doUpdate(data: Product, uuid: string): Observable<any> {
    return this.httpClient
      .patch(
        environment.baseUrl + '/api/procure/v1/products/' + uuid + '/',
        data
      )
      .pipe(map((response: any) => response));
  }

  // DELETE
  public doDelete(uuid: string): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + '/api/procure/v1/products/' + uuid + '/')
      .pipe(map((response: any) => response));
  }

  // RETRIEVE
  public doRetrieve(uuid: string): Observable<any> {
    return this.httpClient
      .get(environment.baseUrl + '/api/procure/v1/products/' + uuid + '/')
      .pipe(map((response: any) => response));
  }

  // GET PROPOSES
  public doGetPropose(uuid: string): Observable<any> {
    return this.httpClient
      .get(
        environment.baseUrl + '/api/procure/v1/products/' + uuid + '/proposes/'
      )
      .pipe(map((response: any) => response));
  }

  /**
   *
   * @param next
   */
  public doList(params: any = {}): Observable<any> {
    const next = params?.next;
    const keyword = params?.keyword;
    const listing_uuid = params?.listing_uuid;

    let url =
      environment.baseUrl +
      '/api/procure/v1/listings/' +
      listing_uuid +
      '/products/';
    if (next) url = next;

    let httpParams = new HttpParams();
    if (keyword) httpParams = httpParams.set('keyword', keyword);

    return this.httpClient
      .get(url, { params: httpParams })
      .pipe(map((response) => response));
  }
}
