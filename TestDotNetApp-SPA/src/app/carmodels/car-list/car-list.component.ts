import { Component, OnInit } from '@angular/core';
import { Carmodel } from '../../_models/carmodel';
import { CarmodelService } from '../../_services/carmodel.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  carmodels: Carmodel[];
  pagination: Pagination;

  constructor(private carmodelService: CarmodelService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadCarModels();
    this.route.data.subscribe(data => {
      this.carmodels = data['carmodels'].result;
      this.pagination = data['carmodels'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    // when page changed, send the API again to get correspond carmodel
    // and then update
    this.loadCarModels();
    // console.log(this.pagination.currentPage);
  }

  loadCarModels() {
    this.carmodelService
      .getCarModels(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Carmodel[]>) => {
        this.carmodels = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertify.error(error);
      });
  }
}
