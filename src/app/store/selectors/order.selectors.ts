import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../reducers/order.reducers';

export const orderState = createFeatureSelector<OrderState>('order');

export const SelectOrder = createSelector(
  orderState,
  (state: OrderState) => state.result
);

export const SelectInquiries = createSelector(
  orderState,
  (state: OrderState) => state
);

export const RetrieveOrder = createSelector(
  orderState,
  (state: OrderState, props: any) => {
    return state;
  }
);
