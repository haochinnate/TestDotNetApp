import { Component, OnInit, Input } from '@angular/core';
import { Carmodel } from 'src/app/_models/carmodel';
import { AuthService } from 'src/app/_services/auth.service';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() carmodel: Carmodel;

  constructor(private authService: AuthService,
              private carmodelService: CarmodelService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.carmodelService.sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(data => {
        this.alertify.success('You have loved: ' + this.carmodel.modelName);
      }, error => {
        this.alertify.error(error);
      }
    );
  }

}
