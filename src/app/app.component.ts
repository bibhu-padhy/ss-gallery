import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from './views/auth/services/auth.service';
import { UploadService } from './views/services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  faPlus = faPlus;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadedFile;
  precentage;
  file: any;
  constructor(
    public authService: AuthService,
    private uploadService: UploadService,
  ) { }


  getFile(e) {
    this.file = e;
  }

  uploadFile() {
    if (this.file) {
      this.uploadService.pushFileToStorage(this.file.target.files[0])
    }
  }
}
