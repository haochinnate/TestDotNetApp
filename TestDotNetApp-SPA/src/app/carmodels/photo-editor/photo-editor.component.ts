import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { Carmodel } from 'src/app/_models/carmodel';
import { CarmodelService } from 'src/app/_services/carmodel.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Input() carmodel: Carmodel;

  // output string for photo URL
  @Output() getCarmodelPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(private authService: AuthService,
              private carmodelService: CarmodelService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      // url: this.baseUrl + 'users/' + this.authService.decodedToken.nameId + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      url: this.baseUrl + 'carmodels/' + this.carmodel.id + '/photos'
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; } ;

    // after success upload the photo, update the photos property to let user see the result
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    // this.carmodel.id original is this.authService.decodedToken.nameid
    this.carmodelService.setMainPhoto(this.carmodel.id, photo.id).subscribe(() => {

      // change the value of isMain property
      this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;

      // emit the photo URL
      this.getCarmodelPhotoChange.emit(photo.url);
      // this.authService.changeMemberPhoto(photo.url);
      // this.authService.currentUSer.photoUrl = photoUrl;
      // localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

      // console.log('Successfully set to main');
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {

    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.carmodelService.deletePhoto(this.carmodel.id, id).subscribe(() => {
        // delete the photo in array
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }

}
