import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { Carmodel } from 'src/app/_models/carmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carmodel: Carmodel;
  createCarmodelForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private carmodelService: CarmodelService,
              private router: Router,
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
    if (this.createCarmodelForm.valid) {
      this.carmodel = Object.assign({}, this.createCarmodelForm.value);

      this.carmodelService.createCarmodel(this.carmodel).subscribe(() => {
        this.alertify.success('carmodel creation successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        // this part is for action after complete
        // course is login automatically
        // this.authService.login(this.user).subscribe(() => {
        //   this.router.navigate(['/members']);
        // });
        this.router.navigate(['/cars']);
      });
    }

    console.log(this.createCarmodelForm.value);
  }

  cancel() {

    console.log('cancelled create new car model');
  }

}
