import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  // values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // no use
    // this.getValues();
  }

  registerToggle() {
    this.registerMode = true;
  }

  // no use
  // getValues() {
  //   this.http.get('http://localhost:5000/api/values').subscribe(
  //     response => {
  //       // store the response
  //       this.values = response;
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  // }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
