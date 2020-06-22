import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { CarListComponent } from './carmodels/car-list/car-list.component';
import { CarDetailComponent } from './carmodels/car-detail/car-detail.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { CarDetailResolver } from './_resolvers/car-detail.resolver';
import { CarListResolver } from './_resolvers/car-list.resolver';
import { CarEditComponent } from './carmodels/car-edit/car-edit.component';
import { CarEditResolver } from './_resolvers/car-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { CarAddComponent } from './carmodels/car-add/car-add.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '', // path of "/[children members]", if 'dumny' means /dumnycars'
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            // { path: 'cars', component: CarListComponent, canActivate: [AuthGuard]},
            { path: 'cars', component: CarListComponent, resolve: {carmodels: CarListResolver}},
            { path: 'cars/add', component: CarAddComponent},
            { path: 'cars/:id', component: CarDetailComponent,
                resolve: {carmodel: CarDetailResolver}},
            { path: 'cars/edit/:id', component: CarEditComponent,
                resolve: {carmodel: CarEditResolver},
                canDeactivate: [PreventUnsavedChanges]},
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'} // order is important!
];
