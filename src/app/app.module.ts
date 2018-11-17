import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './appModules/account/login/login.component';
import { DashboardTemplateComponent } from './containers/dashboard-template/dashboard-template.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AccountsService } from './core/services/accounts.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InterceptorService } from './core/interceptors/http.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/core/store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store/reducers/app.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { AppConfigEffects } from 'src/app/core/store/effects/appconfig.effects';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    AppHeaderModule, AppAsideModule, BsDropdownModule.forRoot(),
    AppBreadcrumbModule, AppFooterModule, TabsModule.forRoot(),
    AppSidebarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects, AppConfigEffects]),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },
    AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
