import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carmodel } from '../_models/carmodel';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarmodelService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCarModels(page?, itemsPerPage?): Observable<PaginatedResult<Carmodel []>> {
    const paginatedResult: PaginatedResult<Carmodel []> = new PaginatedResult<Carmodel []>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Carmodel []>(this.baseUrl + 'carmodels', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getCarModel(id): Observable<Carmodel> {
    return this.http.get<Carmodel>(this.baseUrl + 'carmodels/' + id);
  }

  createCarmodel(carmodel: Carmodel) {
    return this.http.post(this.baseUrl + 'carmodels/add/', carmodel);
  }

  updateCarModel(id: number, carmodel: Carmodel) {
    return this.http.put(this.baseUrl + 'carmodels/' + id, carmodel);
  }

  setMainPhoto(carmodelId: number, id: number) {
    // [POST] http://localhost:5000/api/carmodels/44/photos/42/setmain
    // send empty object
    return this.http.post(this.baseUrl + 'carmodels/' + carmodelId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(carmodelId: number, id: number) {
    // [DELETE] http://localhost:5000/api/carmodels/44/photos/42
    return this.http.delete(this.baseUrl + 'carmodels/' + carmodelId + '/photos/' + id);
  }
}
