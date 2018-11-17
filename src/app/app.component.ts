import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './config.app';
import { AppState } from './core/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { OnLoad, OnUnload } from './core/store/actions/appconfig.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AppConfig {
  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   $event.returnValue = false;
  //   // dispatch call for unload event;
  //   this.store.dispatch(new OnUnload('test'));

  // }
  constructor(translate: TranslateService, private store: Store<AppState>) {
    super(translate);
    // dispatch call for onload event;
    this.store.dispatch(new OnLoad('test'));
    console.log('this');
  }

  OnDestroy() {
    console.log('lol');
  }
}
