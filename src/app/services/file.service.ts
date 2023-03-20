import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FileService {
  private endpoint = environment.ApiUri + '/api/FileHandler';
  uploadUrl = this.endpoint + '/UploadFile';

  refreshFileList = new BehaviorSubject(FileList);

  constructor(private http: HttpClient) {
  }

  public GetInvoiceFileList(invoiceId: number): Observable<any> {
    return this.http.get(
      this.endpoint + '/ListFiles?invoiceId=' + invoiceId
    );
  }

  public GetInvoiceFileUrl(fileId: number): Observable<any> {
    return this.http.get(
      this.endpoint + '/GetInvoiceFileUrl?fileId=' + fileId,
      {responseType: 'text'}
    );
  }

  public RemoveFile(invoiceId: number): Observable<any> {
    return this.http.post(
      this.endpoint + '/RemoveFile', invoiceId
    );
  }

  public UploadInvoicePDF(formData: FormData): Observable<any> {
    return this.http.post(this.endpoint + '/UploadInvoicePDF', formData);
  }
}