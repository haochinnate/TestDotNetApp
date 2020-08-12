import { Component, OnInit } from '@angular/core';
import { Carmodel } from '../_models/carmodel';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { CarmodelService } from '../_services/carmodel.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  carmodels: Carmodel[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService,
              private carmodelService: CarmodelService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.carmodels = data['carmodels'].result;
      this.pagination = data['carmodels'].pagination;
    });

    this.likesParam = 'Likers';
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
      .getCarModels(this.pagination.currentPage, this.pagination.itemsPerPage, 
        null, this.likesParam)
      .subscribe((res: PaginatedResult<Carmodel[]>) => {
        this.carmodels = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertify.error(error);
      });
  }
}
