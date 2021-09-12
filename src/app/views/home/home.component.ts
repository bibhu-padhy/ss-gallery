import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  files
  constructor(
    public uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.uploadService.getFiles()
      .subscribe(files => {
        console.log(files);
        this.files = files
      })
  }

}
