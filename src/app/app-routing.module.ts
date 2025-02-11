import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'home' } },
  { path: 'test-error', component: TestErrorComponent, data: { breadcrumb: 'Test-Error' } },
  { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server-Error' } },
  { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not-Found' } },
  {
    path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule),
    data: { breadcrumb: 'Shop' }
  },
  {
    path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule),
    data: { breadcrumb: 'Basket' }
  },
  {
    path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule),
    data: { breadcrumb: 'Checkout' }
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
    data: { breadcrumb: {skip:true} }
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
