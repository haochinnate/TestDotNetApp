import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  register() {
    // // console.log(this.model);
    // this.authService.register(this.model).subscribe(() => {
    //   // console.log('registration successful');
    //   this.alertify.success('registration successful');
    // }, error => {
    //   // console.log(error);
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value);
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
