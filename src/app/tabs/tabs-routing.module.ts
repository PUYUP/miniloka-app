import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./pages/notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: 'partner',
        loadChildren: () =>
          import('./pages/partner/partner.module').then(
            (m) => m.PartnerPageModule
          ),
      },
      {
        path: 'installment',
        loadChildren: () =>
          import('./pages/installment/installment.module').then(
            (m) => m.InstallmentPageModule
          ),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./pages/history/history.module').then(
            (m) => m.HistoryPageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/account/account.module').then(
            (m) => m.AccountPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'installment',
    loadChildren: () =>
      import('./pages/installment/installment.module').then(
        (m) => m.InstallmentPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
