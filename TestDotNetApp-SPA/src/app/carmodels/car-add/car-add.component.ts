import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };

    this.createAddCarmodelForm();
  }

  createAddCarmodelForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    });

    // maker: string;
    //     modelName: string;
    //     levelName: string;
    //     energyForm: string;
    //     published: Date;
    //     length: number;
    //     width: number;
    //     height: number;
    //     price: number;
    //     horsePower: number;
    //     airbagsNumber: number;
    //     bootCapacity: number;
    //     sizeAndType: string;
    //     fuelConsumption: number;
    //     photoUrl: string;
    //     introduction?: string;
    //     photos?: Photo[];
  }

  createNewCarmodel() {
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

    console.log('cancelled create new car model');
  }

}
