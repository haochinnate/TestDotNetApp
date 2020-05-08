import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { CarListComponent } from './carmodels/car-list/car-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { CarCardComponent } from './carmodels/car-card/car-card.component';
import { CarDetailComponent } from './carmodels/car-detail/car-detail.component';
import { CarDetailResolver } from './_resolvers/car-detail.resolver';
import { CarListResolver } from './_resolvers/car-list.resolver';
import { CarEditComponent } from './carmodels/car-edit/car-edit.component';
import { CarEditResolver } from './_resolvers/car-edit.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './carmodels/photo-editor/photo-editor.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig {
   override = {
      pitch: { enable: false},
      rotate: { enable: false}
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      CarListComponent,
      ListsComponent,
      MessagesComponent,
      CarCardComponent,
      CarDetailComponent,
      CarEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
           tokenGetter: tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
       })
   ],
   providers: [
      ErrorInterceptorProvider,
      AuthService,
      CarDetailResolver,
      CarListResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},
      CarEditResolver,
      AuthGuard,
      PreventUnsavedChanges
      // AlertifyService,
      // CarmodelService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
