import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carmodel } from '../_models/carmodel';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class CarmodelService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCarModels(page?, itemsPerPage?, carmodelParams?, likesParam?): Observable<PaginatedResult<Carmodel []>> {
    const paginatedResult: PaginatedResult<Carmodel []> = new PaginatedResult<Carmodel []>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (carmodelParams != null) {
      params = params.append('MinCarModelLength', carmodelParams.minLength);
      params = params.append('MaxCarModelLength', carmodelParams.maxLength);
      params = params.append('MinCarModelWidth', carmodelParams.minWidth);
      params = params.append('MaxCarModelWidth', carmodelParams.maxWidth);
      params = params.append('MinCarModelHeight', carmodelParams.minHeight);
      params = params.append('MaxCarModelHeight', carmodelParams.maxHeight);
      params = params.append('MinBootCapacity', carmodelParams.minBootCapacity);
      params = params.append('MaxBootCapacity', carmodelParams.maxBootCapacity);
      params = params.append('orderBy', carmodelParams.orderBy);
    }

    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
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

  sendLike(id: number, receipientId: number) {
    // [POST] http://localhost:5000/api/carmodels/3/like/70
    return this.http.post(this.baseUrl + 'carmodels/' + id + '/like/' + receipientId, {});
  }

  getMessage(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContrainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
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

}
