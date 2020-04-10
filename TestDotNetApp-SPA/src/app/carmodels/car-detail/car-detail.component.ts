import { Component, OnInit } from '@angular/core';
import { Carmodel } from 'src/app/_models/carmodel';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carmodel: Carmodel;

  constructor(private carmodelService: CarmodelService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCarmodel();
  }

  // cars/4
  loadCarmodel() {
    // this.route.snapshot.params.id or this.route.snapshot.param['id'] ?
    // + operator is for force pass parameter as int
    this.carmodelService.getCarModel(+this.route.snapshot.params.id).subscribe((carmodel: Carmodel) => {
      this.carmodel = carmodel;
    }, error => {
      this.alertify.error(error);
    });
  }

}
