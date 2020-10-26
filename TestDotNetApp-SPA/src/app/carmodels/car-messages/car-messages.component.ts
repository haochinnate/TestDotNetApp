import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
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
  newMessage: any = {};

  constructor(private carmodelService: CarmodelService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;

    this.carmodelService.getMessageThreadForCarmodel(this.carmodelId)
    .pipe(
      tap(messages => {
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].isRead === false
            && messages[i].recipientId === currentUserId) {
            this.carmodelService.markAsRead(currentUserId, messages[i].id);
          }
        }
      })
    )
    .subscribe(messages => {
        this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.carmodelId;
    this.carmodelService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        // debugger;
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => {
        this.alertify.error(error);
      }
    );
  }
}
