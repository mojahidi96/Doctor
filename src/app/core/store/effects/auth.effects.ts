import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import {
  AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut, LogOutSuccess, LogOutFailure
} from '../actions/auth.actions';
import { of } from 'rxjs/internal/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {

  @Effect()
  public LogIn: Observable<Action> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .debounceTime(500)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.login(payload)
        .map((user: HttpResponse<any>) => {
          console.log('user', user);
          return new LogInSuccess(user);
        })
        .catch((error) => {
          return of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.authService.getLoggedinProfile(user.payload).subscribe(response => {
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        console.log(error, 'error');
      });
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((error) => {

    })
  );

  @Effect()
  public LogOut: Observable<Action> = this.actions
    .ofType(AuthActionTypes.LOGOUT)
    .debounceTime(500)
    .map((action: LogOut) => action.payload)
    .switchMap(payload => {
      return this.authService.logout(payload.xtoken)
        .map((response) => {
          return new LogOutSuccess(response);
        })
        .catch((error) => {
          return of(new LogOutFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public LogOutSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_SUCCESS),
    tap((response) => {
      // const token = jwt_decode(user.payload.token);
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
    })
  );

  @Effect({ dispatch: false })
  LogOutFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_FAILURE),
    tap((error) => {
      // this.toastr.error(error.payload.error.error.message, 'Error', {
      //   timeOut: 3000,
      // });
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
    })
  );

  constructor(
    private actions: Actions,
    private authService: AccountsService,
    private router: Router,
  ) { }
}
