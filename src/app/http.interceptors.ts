import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, TimeoutError, from } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

import { AuthService } from './services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
    private _authService: AuthService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  /**
   * Handle error and show it.
   */
  private _errorHandling(error: HttpErrorResponse) {
    let message = 'Terjadi kesalahan coba lagi.';
    let errorData = error?.error;

    // error as object
    if (typeof errorData === 'object') {
      let msgList = [];

      for (let k in errorData) {
        let e = errorData[k];

        // Check is array
        if (Array.isArray(e)) {
          msgList.push(e.join(' '));
        } else {
          msgList.push(e);
        }
      }

      // Print the message
      message = msgList.join(' ');
    } else {
      // Default errorData
      if (errorData && errorData?.detail) {
        message = errorData?.detail;
      }
    }

    this.presentToast(message);

    // Return an observable with a user-facing error message.
    return throwError(error);
  }

  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    /*
    let url = request.url;

    if (!url.includes('set-default')) {
      // show loading
      const loading = await this.loadingController.create({
        message: 'Loading...',
      });
      await loading.present();
    }
    */

    let token = this._authService.token;
    let headers = {};

    if (token) headers['Authorization'] = `Bearer ${token?.access}`;

    request = request.clone({
      withCredentials: true,
      setHeaders: headers,
    });

    return next.handle(request).toPromise();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = request.url;
    const timeoutValue = request.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);

    return from(this.handleAccess(request, next)).pipe(
      timeout(timeoutValueNumeric),
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          // loading hide
          // if (!url.includes('set-default')) {
          //   this.loadingController.dismiss();
          // }

          if (evt.status == 200 || evt.status == 201) {
            // pass
          }
        }
      }),
      catchError((err) => {
        // loading hide
        // if (!url.includes('set-default')) {
        //   this.loadingController.dismiss();
        // }

        if (err instanceof TimeoutError) {
          return throwError('Timeout');
        } else if (err.status === 403) {
          return next.handle(request);
        } else {
          return this._errorHandling(err);
        }
      })
    );
  }
}
