import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzTableModule} from "ng-zorro-antd/table";
import {HttpService} from "../../../services/http.service";
import {CommonService} from "../../../services/common.service";
import {IPrivacy} from "../../../entity/privacy";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzModalService} from "ng-zorro-antd/modal";
import {PrivacyEditComponent} from "./privacy-edit.component";

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    NzTableModule,
    DatePipe,
    NgForOf,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzColDirective,
    NzRowDirective
  ],
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent implements OnInit{
  privacyList: IPrivacy[] = []

  constructor(
    private modalService: NzModalService,
    private httpService: HttpService,
    private commonService : CommonService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList = () => {
    this.httpService.get<any>(`privacy`)
      .subscribe(res => {
        if (res.code === 0) {
          this.privacyList = res.data.content;
        }
      })
  }

  edit = (privacy: IPrivacy | {}) => {
    const modal = this.modalService.create({
      nzTitle: "隐私保护",
      nzCentered: true,
      nzContent: PrivacyEditComponent,
      nzData: privacy,
      nzOnOk: instance => instance.submit()
    });
    modal.afterClose.subscribe(res => {
      if (res) this.getList();
    });
  }

  delete = (privacy: IPrivacy) => {
    this.httpService.delete<any>(`privacy`, {ids: [privacy.id]})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getList()));
  }

}
