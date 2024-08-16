import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@fake-db/fake-db.service';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from '@ctrl/ngx-rightclick';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';

import { coreConfig } from 'app/app-config';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { fakeBackendProvider } from 'app/auth/helpers'; // used to create fake backend
import { JwtInterceptor, ErrorInterceptor } from 'app/auth/helpers';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ContextMenuComponent } from 'app/main/extensions/context-menu/context-menu.component';
import { AnimatedCustomContextMenuComponent } from './main/extensions/context-menu/custom-context-menu/animated-custom-context-menu/animated-custom-context-menu.component';
import { BasicCustomContextMenuComponent } from './main/extensions/context-menu/custom-context-menu/basic-custom-context-menu/basic-custom-context-menu.component';
import { SubMenuCustomContextMenuComponent } from './main/extensions/context-menu/custom-context-menu/sub-menu-custom-context-menu/sub-menu-custom-context-menu.component';
import { ListFondComponent } from './component/fond/list-fond/list-fond.component';
import { AddFondComponent } from './component/fond/add-fond/add-fond.component';
import { ListModaliteComponent } from './component/modalite/list-modalite/list-modalite.component';
import { AddModaliteComponent } from './component/modalite/add-modalite/add-modalite.component';
import { ListPartenaireComponent } from './component/partenaire/list-partenaire/list-partenaire.component';
import { AddPartenaireComponent } from './component/partenaire/add-partenaire/add-partenaire.component';
import { AddConventionComponent } from './component/convention/add-convention/add-convention.component';
import { ViewFondComponent } from './component/fond/view-fond/view-fond.component';
import { ViewPartenaireComponent } from './component/partenaire/view-partenaire/view-partenaire.component';
import { ViewComponent } from './component/modalite/view/view.component';
import { AuthComponent } from './component/auth/auth.component';
import { LoginComponent } from './component/login/login.component';
import { ListDemandeComponent } from './component/demande/list-demande/list-demande.component';
import { AddDemandeComponent } from './component/demande/add-demande/add-demande.component';
import { TokenInterceptorInterceptor } from './interceptor/token-interceptor.interceptor';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [


  { path: 'listfonds', component: ListFondComponent },
  { path: 'addfonds', component: AddFondComponent },
  { path: 'addfonds/:id', component: AddFondComponent },


  { path: 'listmodalite', component: ListModaliteComponent },
  { path: 'addmodalite', component: AddModaliteComponent },
  { path: 'addmodalite/:id', component: AddModaliteComponent },

  { path: 'listpartenaire', component: ListPartenaireComponent },
  { path: 'addpartenaire', component: AddPartenaireComponent },
  { path: 'addpartenaire/:id', component: AddPartenaireComponent },

  { path: 'viewpartenaire/:id', component: ViewPartenaireComponent },


  { path: 'addconvention', component: AddConventionComponent },


  { path: 'register', component: AuthComponent },   
  { path: 'auth', component: LoginComponent },


  { path: 'listdemande', component: ListDemandeComponent },
  { path: 'adddemande', component: AddDemandeComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'components',
    loadChildren: () => import('./main/components/components.module').then(m => m.ComponentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'extensions',
    loadChildren: () => import('./main/extensions/extensions.module').then(m => m.ExtensionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forms',
    loadChildren: () => import('./main/forms/forms.module').then(m => m.FormsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tables',
    loadChildren: () => import('./main/tables/tables.module').then(m => m.TablesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'charts-and-maps',
    loadChildren: () => import('./main/charts-and-maps/charts-and-maps.module').then(m => m.ChartsAndMapsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'pages/authentication/login-v1',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
    declarations: [
        AppComponent,
        ContextMenuComponent,
        BasicCustomContextMenuComponent,
        AnimatedCustomContextMenuComponent,
        SubMenuCustomContextMenuComponent,
        ListFondComponent,
        AddFondComponent,
        ListModaliteComponent,
        AddModaliteComponent,
        ListPartenaireComponent,
        AddPartenaireComponent,
        AddConventionComponent,
        ViewFondComponent,
        ViewPartenaireComponent,
        ViewComponent,
        AuthComponent,
        LoginComponent,
        ListDemandeComponent,
        AddDemandeComponent
    ],
    imports: [
        FormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        RouterModule.forRoot(appRoutes, {
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy'
        }),
        NgbModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        ContextMenuModule,
        CoreModule.forRoot(coreConfig),
        CoreCommonModule,
        CoreSidebarModule,
        CoreThemeCustomizerModule,
        CardSnippetModule,
        LayoutModule,
        ContentHeaderModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true },
        // ! IMPORTANT: Provider used to create fake backend, comment while using real API
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
