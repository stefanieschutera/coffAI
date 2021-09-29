import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  files: File[] = [];

  uploadFiles($event: any) {
    try {
      let uploadedFiles: File[] = Array.from($event?.target?.files);
      this.files = [...this.files, ...uploadedFiles];
    } catch (error: any) {
      console.log('Error: Uploading selected files from browsing was not successful', error);
    }
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }
}
