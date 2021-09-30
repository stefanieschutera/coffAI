import { Component, EventEmitter, Output } from '@angular/core';
import { from, Observable, Observer, of } from 'rxjs';
import { IUploadedData } from '../IData';
import { concatMap, catchError, take } from 'rxjs/operators';

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

  uploadImages($event: any) {
    const images = $event?.target?.files;
    let newImages: File[] = Array.from($event?.target?.files);
    this.images = [...this.images, ...newImages];
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

  trainModel() {
    alert('Not implemented');
  }

  deleteImage(index: number) {
    this.images.splice(index, 1);
  }

  notImplemented() {
    alert('Not implemented');
  }

  thereAreImages(): boolean {
    return this.images.length !== 0 && this.images !== undefined;
  }
}
