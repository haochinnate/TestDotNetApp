import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Carmodel } from 'src/app/_models/carmodel';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { AuthService } from 'src/app/_services/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  carmodel: Carmodel;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private carmodelService: CarmodelService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.carmodel = data['carmodel'];
    });
  }

  updateCarmodel() {
    // console.log(this.carmodel);
    // this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
    //   this.alertify.success('Profile updated successfully');
    //   this.editForm.reset(this.user); // to only clean the dirty state
    // }, error => {
    //   this.alertify.error(error));
    // });

    this.carmodelService.updateCarModel(this.carmodel.id, this.carmodel).subscribe(
      next => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.carmodel); // to only clean the dirty state
      }, error => {
        this.alertify.error(error);
      }
    );
  }
}
