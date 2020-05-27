import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; //  empty object to store username and password

  // private authService doesn't have error likes in course video
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(next => {
      // console.log('logged in successfully');
      this.alertify.success('logged in successfully');
    }, error => {
      // console.log('Failed to login');
      // console.log(error);
      this.alertify.error(error);
    }, () => {
      // if complete, then go to this pages
      this.router.navigate(['/cars']);
    });
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    this.authService.decodedToken = null;
    // this.authService.currentUser = null;

    // console.log('logged out');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
