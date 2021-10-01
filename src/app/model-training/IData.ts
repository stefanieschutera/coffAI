export interface IUploadedData {
  file?: File;
  error?: IUploadError;
}

export interface IUploadError {
  name: string;
  errorMessage: string;
}
