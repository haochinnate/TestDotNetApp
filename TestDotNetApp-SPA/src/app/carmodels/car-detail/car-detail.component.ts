import { Component, OnInit } from '@angular/core';
import { Carmodel } from 'src/app/_models/carmodel';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carmodel: Carmodel;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private carmodelService: CarmodelService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadCarmodel();
    this.route.data.subscribe(data => {
      const carmodel = 'carmodel';
      this.carmodel = data[carmodel];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.carmodel.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }

    return imageUrls;
  }

  // cars/4
  // loadCarmodel() {
  //   // this.route.snapshot.params.id or this.route.snapshot.param['id'] ?
  //   // + operator is for force pass parameter as int
  //   this.carmodelService.getCarModel(+this.route.snapshot.params['id']).subscribe((carmodel: Carmodel) => {
  //     this.carmodel = carmodel;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
