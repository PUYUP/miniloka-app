import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { GuestGuard } from './guards/guest/guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
    canActivate: [GuestGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/account/login/login.module').then(
        (m) => m.LoginPageModule
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/account/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'lost-password',
    loadChildren: () =>
      import('./pages/account/lost-password/lost-password.module').then(
        (m) => m.LostPasswordPageModule
      ),
  },
  {
    path: 'inquiry-detail',
    loadChildren: () =>
      import('./pages/inquiry-detail/inquiry-detail.module').then(
        (m) => m.InquiryDetailPageModule
      ),
  },
  {
    path: 'inquiry-send-propose',
    loadChildren: () =>
      import('./pages/inquiry-send-propose/inquiry-send-propose.module').then(
        (m) => m.InquirySendProposePageModule
      ),
  },
  {
    path: 'listing-detail',
    loadChildren: () =>
      import('./pages/listing-detail/listing-detail.module').then(
        (m) => m.ListingDetailPageModule
      ),
  },
  {
    path: 'listing-inquiry',
    loadChildren: () =>
      import('./pages/listing-inquiry/listing-inquiry.module').then(
        (m) => m.ListingInquiryPageModule
      ),
  },
  {
    path: 'propose-detail',
    loadChildren: () => import('./pages/propose-detail/propose-detail.module').then( m => m.ProposeDetailPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
