import { Injectable } from '@angular/core';
import { Carmodel } from '../_models/carmodel';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CarmodelService } from '../_services/carmodel.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<Carmodel[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(private carmodelService: CarmodelService,
                private router: Router,
                private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Carmodel[]> {
        // to handle if carmodel doesn't exist
        return this.carmodelService.getCarModels(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}
