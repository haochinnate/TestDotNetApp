import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CarmodelService } from 'src/app/_services/carmodel.service';

@Component({
  selector: 'app-car-messages',
  templateUrl: './car-messages.component.html',
  styleUrls: ['./car-messages.component.css']
})
export class CarMessagesComponent implements OnInit {

  // @Input() recipientId: number;
  @Input() carmodelId: number;
  messages: Message[];

  constructor(private carmodelService: CarmodelService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.carmodelService.getMessageThreadForCarmodel(this.carmodelId)
      .subscribe(messages => {
        this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }
}
