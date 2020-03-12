import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // the name have to be the same in home componet.html
  // for communication, parent(home component) to child(register component)
  // @Input() valuesFromHome: any;

  // for communication, child(register component) to parent(home component)
  // use EventEmitter in angular core
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    // console.log(this.model);
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    // componet communication
    // click button -> cancel() -> cancelRegister emit
    // -> cancelRegisterMode($event) in home.component.html
    // -> cancelRegisterMode function in home.component.ts
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
