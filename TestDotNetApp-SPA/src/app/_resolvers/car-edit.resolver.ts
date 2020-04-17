import { Injectable } from '@angular/core';
import { Carmodel } from '../_models/carmodel';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CarmodelService } from '../_services/carmodel.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class CarEditResolver implements Resolve<Carmodel> {
    constructor(private carmodelService: CarmodelService,
                private authService: AuthService,
                private router: Router,
                private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Carmodel> {
        // to handle if carmodel doesn't exist
        // return this.carmodelService.getCarModel(this.authService.decodedToken.nameid).pipe(
        return this.carmodelService.getCarModel(route.params['id']).pipe(
                catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/cars']);
                return of(null);
            })
        );
    }

}
