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
  createCarmodelForm: FormGroup;
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
    this.createCarmodelForm = this.fb.group({
      maker: ['', Validators.required],
      modelName: ['', Validators.required],
      levelName: ['', Validators.required],
      energyForm: ['', Validators.required],
      published: [null, Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      price: ['', Validators.required],
      horsePower: ['', Validators.required],
      airbagsNumber: ['', Validators.required],
      bootCapacity: ['', Validators.required],
      sizeAndType: ['', Validators.required],
      fuelConsumption: ['', Validators.required]
    });
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
    console.log(this.createCarmodelForm.value);
  }

  cancel() {

    console.log('cancelled create new car model');
  }

}
