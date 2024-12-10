import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    BasketSummaryComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    BasketSummaryComponent,
    ReactiveFormsModule,
    TextInputComponent
  ]
})
export class SharedModule { }
