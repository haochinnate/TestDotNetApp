import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { CarListComponent } from './carmodels/car-list/car-list.component';
import { CarDetailComponent } from './carmodels/car-detail/car-detail.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '', // path of "/[children members]", if 'dumny' means /dumnycars'
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            // { path: 'cars', component: CarListComponent, canActivate: [AuthGuard]},
            { path: 'cars', component: CarListComponent},
            { path: 'cars/:id', component: CarDetailComponent},
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'} // order is important!
];
