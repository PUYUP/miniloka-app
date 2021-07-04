import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducers';

export const productState = createFeatureSelector<ProductState>('product');

export const SelectProduct = createSelector(
  productState,
  (state: ProductState) => state.result
);

export const SelectProducts = createSelector(
  productState,
  (state: ProductState) => state
);

export const RetrieveProduct = createSelector(
  productState,
  (state: ProductState, props: any) => {
    return state;
  }
);
