import { Injectable } from '@angular/core';
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {Observable, Observer} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private messageService: NzMessageService
  ) { }

  beforeUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.messageService.create('error', '仅支持jpg和png格式!');
        observer.complete();
        return;
      }
      const size = file.size! / 1024 / 1024 < 1;
      if (!size) {
        this.messageService.create('error', '文件不得大于1M!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && size);
      observer.complete();
    });

  uploadFile = (info: NzUploadChangeParam, callback?: () => void) =>{
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        if (callback) callback();
        break;
      case 'error':
        this.messageService.create('error', '上传错误!');
        break;
    }
  }
}
