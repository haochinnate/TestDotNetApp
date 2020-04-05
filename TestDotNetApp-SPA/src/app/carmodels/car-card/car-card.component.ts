import { Component, OnInit, Input } from '@angular/core';
import { Carmodel } from 'src/app/_models/carmodel';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() carmodel: Carmodel;

  constructor() { }

  ngOnInit() {
  }

}
