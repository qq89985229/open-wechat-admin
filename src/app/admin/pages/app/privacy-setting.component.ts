import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {HttpParams} from "@angular/common/http";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FormsModule} from "@angular/forms";
import {IAuthorizer} from "../../../entity/authorizer";
import {HttpService} from "../../../services/http.service";
import {IPrivacy} from "../../../entity/privacy";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NgForOf} from "@angular/common";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-privacy-setting',
  standalone: true,
  imports: [
    NzCheckboxModule,
    FormsModule,
    NzGridModule,
    NgForOf
  ],
  templateUrl: './privacy-setting.component.html'
})
export class PrivacySettingComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  allChecked = false;
  indeterminate = true;
  privacyList: IPrivacy[] = [];
  constructor(
    private commonService: CommonService,
    private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.getPrivacyList();
  }

  getPrivacyList = () => {
    this.httpService.get<any>(`open-ma-privacy/get-privacy-setting`, new HttpParams().set("appId", this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) {
          this.privacyList = res.data;
        }
      })
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.privacyList = this.privacyList.map(privacy => ({
        ...privacy,
        checked: true
      }))
    } else {
      this.privacyList = this.privacyList.map(privacy => ({
        ...privacy,
        checked: false
      }));
    }
  }

  updateChecked = (ids: string[]) => {
    this.privacyList = this.privacyList.map((privacy: IPrivacy) => {
      if (ids.includes(privacy.id)) {
        return {
          ...privacy,
          checked: true
        };
      }
      return privacy;
    });
    this.indeterminate = this.privacyList.some(privacy => !privacy.checked) && this.privacyList.some(privacy => privacy.checked);
    this.allChecked = this.privacyList.every(privacy => privacy.checked);
  }

  submit = () => {
    const privacyList = this.privacyList.filter(({checked}) => checked);
    if (privacyList.length > 0) {
      this.httpService.post<any>(`open-ma-privacy/set-privacy-setting`, {appId: this.authorizer.appId, privacyList})
        .subscribe(res => this.commonService.resultCallback(res, () => this.getPrivacyList()));
    }
  }
}
