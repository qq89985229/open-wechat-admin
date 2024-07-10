import {Component, inject, OnInit} from '@angular/core';
import {NzTableModule} from "ng-zorro-antd/table";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {IAuthorizer} from "../../../entity/authorizer";
import {NZ_MODAL_DATA, NzModalService} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {HttpParams} from "@angular/common/http";
import {IAccountBasicInfo} from "../../../entity/account-basic-info";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {SetNicknameComponent} from "./set-nickname.component";
import {ModifyHeadImageComponent} from "./modify-head-image.component";
import {ModifySignatureComponent} from "./modify-signature.component";

@Component({
  selector: 'app-account-basic-info',
  standalone: true,
  imports: [
    NzTableModule,
    NgForOf,
    NgIf,
    NzTagComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NzAvatarModule
  ],
  templateUrl: './account-basic-info.component.html'
})
export class AccountBasicInfoComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  accountBasicInfo: IAccountBasicInfo = {} as IAccountBasicInfo;

  constructor(
    private modalService: NzModalService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAccountBasicInfo();
  }

  getAccountBasicInfo = () => {
    this.httpService.get<any>(`open-ma-basic/get-account-basic-info`, new HttpParams().set("appId", this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) this.accountBasicInfo = res.data;
      })
  }

  // 设置小程序名称
  setNickname = () => {
    const modal = this.modalService.create({
      nzTitle: "设置小程序名称",
      nzCentered: true,
      nzContent: SetNicknameComponent,
      nzData: this.accountBasicInfo,
      nzOnOk: instance => instance.submit(),
    });
    modal.afterClose.subscribe(res => {
      if (res) this.getAccountBasicInfo();
    });
  }

  // 修改头像
  modifyHeadImage = () => {
    const modal = this.modalService.create({
      nzTitle: "修改头像",
      nzCentered: true,
      nzContent: ModifyHeadImageComponent,
      nzData: this.accountBasicInfo,
      nzOnOk: instance => instance.submit(),
    });
    modal.afterClose.subscribe(res => {
      if (res) this.getAccountBasicInfo();
    });
  }

  // 修改功能介绍
  modifySignature = () => {
    const modal = this.modalService.create({
      nzTitle: "修改功能介绍",
      nzCentered: true,
      nzContent: ModifySignatureComponent,
      nzData: this.accountBasicInfo,
      nzOnOk: instance => instance.submit(),
    });
    modal.afterClose.subscribe(res => {
      if (res) this.getAccountBasicInfo();
    });
  }

  submit = () => {

  }


}
