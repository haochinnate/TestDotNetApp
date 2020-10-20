import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { CarmodelService } from '../_services/carmodel.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Outbox';

  constructor(private carmodelService: CarmodelService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.carmodelService.getMessage(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage,
      this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message', () => {
      this.carmodelService.deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(() => {
          // delete the message in this components
          this.messages.splice(this.messages.findIndex(m => m.id === id, 1));
          this.alertify.success('Message has been deleted');
        }, error => {
          this.alertify.error('Failed to delete the message');
        });
    })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
