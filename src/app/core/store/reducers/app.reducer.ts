import { createSelector } from 'reselect';


import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../../environments/environment';


import * as Auth from './auth.reducer';

export interface AppState {
    router: fromRouter.RouterReducerState;
    authState: Auth.State;
}

export const reducers = {
    router: fromRouter.routerReducer,
    authState: Auth.reducer,
};

// reason to combineReducers is have all the reducers combined to one single app reducer

// storefreeze will help us prevent our state from being mutated
const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers);
const productionReducer: ActionReducer<AppState> = compose(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}


export const getAppAuthState = (state: AppState) => state.authState;


export const getAuthenticatedUser = createSelector(getAppAuthState, Auth.getAuthenticatedUser);

export const getAuthenticationError = createSelector(getAppAuthState, Auth.getAuthenticationError);

export const isAuthenticated = createSelector(getAppAuthState, Auth.isAuthenticated);



