import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private messageService: NzMessageService,
  ) { }

  // 结果回调
  resultCallback = (res: any, onSuccessCallback?: () => void) => {
    if (res.code === 0){
      this.messageService.create('success', res.message);
      if (onSuccessCallback) onSuccessCallback();
    }else {
      this.messageService.create('error', res.message);
    }
  }
}
