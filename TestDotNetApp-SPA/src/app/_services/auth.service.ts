import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

// inject things to service, service is not component which is injectable by default
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'http://localhost:5000/api/auth/';
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  // I didn't create the User class
  // currentUser: User;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe( // post will return Observable<object>, login method return the "token"
        map((response: any) => {
          // see AuthController.cs login method
          const user = response; // this will be Ok response
          if (user) {
            localStorage.setItem('token', user.token);
            // localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            // this.currentUser = user.user;
            console.log(this.decodedToken);
          }
        })
      );
  }

    register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // not expired -> loggin
    // is expired -> false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
