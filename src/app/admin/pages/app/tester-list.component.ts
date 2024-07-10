import {Component, inject, OnInit} from '@angular/core';
import {IAuthorizer} from "../../../entity/authorizer";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {HttpParams} from "@angular/common/http";
import {NzListComponent, NzListItemComponent, NzListItemMetaTitleComponent} from "ng-zorro-antd/list";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {ITester} from "../../../entity/tester";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-tester-list',
  standalone: true,
  imports: [
    NzListComponent,
    NzListItemComponent,
    NzListItemMetaTitleComponent,
    NzPopconfirmDirective
  ],
  templateUrl: './tester-list.component.html'
})
export class TesterListComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  testerList: ITester[] = [];
  constructor(
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getTesterList();
  }

  getTesterList = () => {
    this.httpService.get<any>(`open-ma/get-tester-list`, new HttpParams().set('appId', this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) {
          this.testerList = res.data.membersList;
        }
      })
  }

  unbindTester = (userStr: string) => {
    this.httpService.post<any>(`open-ma/unbind-tester`, {appId: this.authorizer.appId, userStr})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getTesterList()));
  }

}
