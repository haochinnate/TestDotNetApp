import { Component, OnInit, ViewChild } from '@angular/core';
import { Carmodel } from 'src/app/_models/carmodel';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  carmodel: Carmodel;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.carmodel = data['carmodel'];
    });
  }

  updateCarmodel() {
    console.log(this.carmodel);
    this.alertify.success('Profile updated successfully');
    this.editForm.reset(this.carmodel); // to only clean the dirty state
  }
}
