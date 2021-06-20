import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { DatePipe, registerLocaleData } from '@angular/common';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppReducers } from './store/reducers';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import localeId from '@angular/common/locales/id';
import { DEFAULT_TIMEOUT, HTTPInterceptor } from './http.interceptors';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects';

registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot(AppEffects),
  ],
  providers: [
    DatePipe,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    FirebaseX,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true,
    },
    {
      provide: DEFAULT_TIMEOUT,
      useValue: 50000,
    },
    {
      provide: LOCALE_ID,
      useValue: 'id-ID',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
