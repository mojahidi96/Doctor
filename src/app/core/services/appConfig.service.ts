import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getAppAuthState } from 'src/app/core/store/reducers/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    constructor(private store: Store<AppState>) { }
    load() {
       return this.store.select(getAppAuthState);
        // .subscribe(res => {
        //     const appState = res;
        //     sessionStorage.setItem('appState', JSON.stringify(appState));
        // });

    }
    unload() {
        // const data = JSON.parse(sessionStorage.getItem('appState'));
        return this.store.select(getAppAuthState);
    }

}
