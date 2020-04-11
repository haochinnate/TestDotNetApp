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
}
