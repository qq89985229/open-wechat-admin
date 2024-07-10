import {Component, inject} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {IAccountBasicInfo} from "../../../entity/account-basic-info";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzUploadChangeParam, NzUploadFile, NzUploadModule} from "ng-zorro-antd/upload";
import {environment} from "../../../../environments/environment";
import {NzIconModule} from "ng-zorro-antd/icon";
import {CommonService} from "../../../services/common.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observable} from "rxjs";
import {UploadService} from "../../../services/upload.service";
import {NzButtonModule} from "ng-zorro-antd/button";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-modify-head-image',
  standalone: true,
  imports: [
    NzFormModule,
    NzUploadModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './modify-head-image.component.html'
})
export class ModifyHeadImageComponent {
  accountBasicInfo: IAccountBasicInfo = inject(NZ_MODAL_DATA);
  uploadUrl = environment.apiUrl + '/mp-material/media-upload';
  fileList: NzUploadFile[] = [];
  mediaId: string = "";

  constructor(
    private nzModalRef: NzModalRef,
    private messageService: NzMessageService,
    private httpService: HttpService,
    private commonService: CommonService,
    private uploadService: UploadService) {
  }

  beforeUpload = (file: NzUploadFile): Observable<boolean> => this.uploadService.beforeUpload(file);

  uploadFile = (info: NzUploadChangeParam) => this.uploadService.uploadFile(info, () => {
    const mediaId = info.file.response.data.mediaId;
    this.fileList = [{
      url: `${environment.apiUrl}/mp-material/get-image?appId=${this.accountBasicInfo.appId}&mediaId=${mediaId}`,
      uid: `${mediaId}`,
      name: `${mediaId}`
    }];
    this.mediaId = mediaId;
  })

  submit = (): boolean => {
    const mediaId = this.mediaId;
    if (mediaId.length === 0){
      this.messageService.create('error', '请上传头像');
      return false;
    }
    this.httpService.post<any>(`open-ma-basic/modify-head-image`, {appId: this.accountBasicInfo.appId, mediaId})
      .subscribe(res => this.commonService.resultCallback(res, () => this.nzModalRef.destroy(true)))
    return false;
  }
}
