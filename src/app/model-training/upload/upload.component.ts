import { Component, EventEmitter, Output } from '@angular/core';
import { from, Observable, Observer, of } from 'rxjs';
import { IUploadedData } from '../IData';

import { concatMap, catchError, take, delay } from 'rxjs/operators';

const INVALID_FILE = ' Invalid file.';
const INVALID_IMAGE = ' Invalid image.';
const INVALID_SIZE = ' Invalid Size.';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  @Output() uploadedData: EventEmitter<IUploadedData> = new EventEmitter();
  images: File[] = [];
  testImage!: File;
  showSpinner: boolean = false;
  showTrainingResult: boolean = false;
  showTestResult: boolean = false;

  uploadImages($event: any) {
    let newImages: File[] = Array.from($event?.target?.files);
    this.images = [...this.images, ...newImages];
  }

  async uploadTestImage($event: any) {
    this.testImage = (await $event?.target?.files[0]) as File;
    console.log('testImage name: ' + this.testImage?.name);
    this.showSpinner = true;
    await new Promise((f) => setTimeout(f, 700)); // TODO PO add your funny method to test if image is recognized
    this.showSpinner = false;
    this.showTestResult = true;
  }

  uploadImagesForTraining($event: any) {
    const numberOfImages = this.images.length;
    from(this.images)
      .pipe(
        concatMap((image: File) => this.validateImage(image).pipe(catchError((error: IUploadedData) => of(error)))),
        take(numberOfImages)
      )
      .subscribe((image: IUploadedData) => {
        this.uploadedData.emit(image);
      });
  }

  private validateImage(file: File): Observable<IUploadedData> {
    const fileReader = new FileReader();
    const { type, name } = file;
    return new Observable((observer: Observer<IUploadedData>) => {
      this.validateSize(file, observer);
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (this.isImage(type)) {
          const image = new Image();
          image.onload = () => {
            observer.next({ file });
            observer.complete();
          };
          image.onerror = () => {
            observer.error({ error: { name, errorMessage: INVALID_IMAGE } });
          };
          image.src = fileReader.result as string;
        } else {
          observer.next({ file });
          observer.complete();
        }
      };
      fileReader.onerror = () => {
        observer.error({ error: { name, errorMessage: INVALID_FILE } });
      };
    });
  }

  private validateSize(file: File, observer: Observer<IUploadedData>): void {
    const { name, size } = file;
    if (!this.isValidSize(size)) {
      observer.error({ error: { name, errorMessage: INVALID_SIZE } });
    }
  }

  private isValidSize(size: number): boolean {
    const toKByte = size / 1024;
    return toKByte >= 5 && toKByte <= 5120; // TODO which min and max size is reasonable?
  }

  private isImage(mimeType: string): boolean {
    return mimeType.match(/image\/*/) !== null;
  }

  async trainModel() {
    this.showSpinner = true;
    await new Promise((f) => setTimeout(f, 700)); // TODO PO add your funny method
    this.showSpinner = false;
    this.showTrainingResult = true;
  }

  exportModel() {}

  loadExample() {
    this.images = [];
  }

  deleteImage(index: number) {
    this.images.splice(index, 1);
  }

  reset() {
    this.images = [];
    this.showTrainingResult = false;
    this.showTestResult = false;
  }

  thereAreImages(): boolean {
    return this.images.length !== 0 && this.images !== undefined;
  }
}
