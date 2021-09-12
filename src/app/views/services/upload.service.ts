import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { map } from 'rxjs/operators';
import { FileDataModel } from 'src/app/shared/file';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private db: AngularFirestore,
    public storage: AngularFireStorage,
    private authService: AuthService) { }

  async pushFileToStorage(file: any) {
    const fileToUpload = file
    const filePath = '/uploads/' + fileToUpload.name
    const storageRef = this.storage.ref(filePath);
    await this.storage.upload(filePath, fileToUpload)
    storageRef.getDownloadURL()
      .subscribe(async res => {
        console.log(res);
        const fileType = fileToUpload.name.split('.')
        const file = {
          name: fileToUpload.name,
          url: res,
          size: fileToUpload.size,
          type: fileType[fileType.length - 1],
          uid: await this.authService.getUserId(),
          folderId: '',
          date: new Date(),
          tags: ['']
        }
        this.saveFileData(file);
      })
  }

  private saveFileData(fileUpload: FileDataModel): void {
    this.db.collection('uploads').add(fileUpload);
  }

  getFiles() {
    return this.db.collection('uploads')
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(file => {
            if (file.payload.doc.exists) {
              return file.payload.doc.data();
            }
          })
        })
      )
  }

  // deleteFile(fileUpload: FileUpload): void {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }

  // private deleteFileDatabase(key: string): Promise<void> {
  //   return this.db.list(this.basePath).remove(key);
  // }

  // private deleteFileStorage(name: string): void {
  //   const storageRef = this.storage.ref(this.basePath);
  //   storageRef.child(name).delete();
  // }
}
