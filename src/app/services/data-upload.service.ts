import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataUploadService {
  constructor() {}

  fileUpload(formData: FormData) {
    console.log('file upload service triggered');
    return of(Boolean);
  }
}
