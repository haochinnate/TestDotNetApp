import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carmodel } from '../_models/carmodel';

@Injectable({
  providedIn: 'root'
})
export class CarmodelService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCarModels(): Observable<Carmodel []> {
    return this.http.get<Carmodel []>(this.baseUrl + 'carmodels');
  }

  getCarModel(id): Observable<Carmodel> {
    return this.http.get<Carmodel>(this.baseUrl + 'carmodels/' + id);
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
