import { createReducer, on } from '@ngrx/store';
import { initialState, } from '../models';
import * as ProductsActions from './../actions';



export const productReducer = createReducer(initialState,
  on( ProductsActions.getProducts, (state) => {

    //console.log('ProductsActions.getProducts', state.departments)
    return ({
      ...state
    })
  }),
  on((state, action) => {
    console.log('DEFAULT')
    return ({
      ...state
    })
  })
)
