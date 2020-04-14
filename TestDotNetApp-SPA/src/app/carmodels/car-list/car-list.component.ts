import { Component, OnInit } from '@angular/core';
import { Carmodel } from '../../_models/carmodel';
import { CarmodelService } from '../../_services/carmodel.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  carmodels: Carmodel[];

  constructor(private carmodelService: CarmodelService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadCarModels();
    this.route.data.subscribe(data => {
      this.carmodels = data['carmodels'];
    });
  }

  // loadCarModels() {
  //   this.carmodelService.getCarModels().subscribe((carmodels: Carmodel[]) => {
  //     this.carmodels = carmodels;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
