import { Component, OnInit } from '@angular/core';
import { Carmodel } from 'src/app/_models/carmodel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  carmodel: Carmodel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.carmodel = data['carmodel'];
    });
  }

}
