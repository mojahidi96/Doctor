import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import {
    AppConfigActionTypes, OnLoad, OnUnload, OnLoadSuccess, OnLoadFailure, OnUnloadSuccess, OnUnloadFailure
} from 'src/app/core/store/actions/appconfig.actions';
import { AppConfigService } from 'src/app/core/services/appConfig.service';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class AppConfigEffects {

    @Effect()
    public Load: Observable<Action> = this.actions
        .ofType(AppConfigActionTypes.WINDOW_LOAD)
        .debounceTime(500)
        .map((action: OnLoad) => action.payload)
        .switchMap(payload => {
            return this.appConfigService.load()
                .map((user) => {
                    return new OnLoadSuccess(user);
                })
                .catch((error) => {
                    return of(new OnLoadFailure({ error: error }));
                });
        });

    @Effect({ dispatch: false })
    public OnLoadSuccess: Observable<any> = this.actions.pipe(
        ofType(AppConfigActionTypes.WINDOW_LOAD_SUCCESS),
        tap((user) => {
            console.log(user);
        })
    );

    @Effect({ dispatch: false })
    OnLoadFailure: Observable<any> = this.actions.pipe(
        ofType(AppConfigActionTypes.WINDOW_LOAD_FAILURE),
        tap((error) => {
            console.log(error);
        })
    );

    @Effect()
    public UnLoad: Observable<Action> = this.actions
        .ofType(AppConfigActionTypes.WINDOW_UNLOAD)
        .debounceTime(500)
        .map((action: OnUnload) => action.payload)
        .switchMap(payload => {
            return this.appConfigService.unload()
                .map((response) => {
                    return new OnUnloadSuccess(response);
                })
                .catch((error) => {
                    return of(new OnUnloadFailure({ error: error }));
                });
        });

    @Effect({ dispatch: false })
    public OnUnloadSuccess: Observable<any> = this.actions.pipe(
        ofType(AppConfigActionTypes.WINDOW_UNLOAD_SUCCESS),
        tap((response) => {

        })
    );

    @Effect({ dispatch: false })
    OnUnloadFailure: Observable<any> = this.actions.pipe(
        ofType(AppConfigActionTypes.WINDOW_UNLOAD_FAILURE),
        tap((error) => {
            console.log(error);
        })
    );

    constructor(
        private actions: Actions,
        private appConfigService: AppConfigService
    ) { }
}
