import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { CarListComponent } from './car-list/car-list.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'cars', component: CarListComponent, canActivate: [AuthGuard]},
    { path: 'messages', component: MessagesComponent},
    { path: 'lists', component: ListsComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'} // order is important!
];
