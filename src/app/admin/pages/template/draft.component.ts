import {Component, OnInit} from '@angular/core';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {ITemplate} from "../../../entity/template";
import {HttpService} from "../../../services/http.service";
import {NzTableModule} from "ng-zorro-antd/table";
import {DatePipe, NgForOf} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-draft',
  standalone: true,
    imports: [
      NzTableModule,
      DatePipe,
      NgForOf,
      NzSpaceModule,
      NzButtonModule,
      NzIconModule,
      NzPopconfirmModule
    ],
  templateUrl: './draft.component.html'
})
export class DraftComponent implements OnInit{
  templates: ITemplate[] = []

  constructor(
    private httpService: HttpService,
    private commonService : CommonService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList = () => {
    this.httpService.get<any>(`open-component/get-template-draft-List`)
      .subscribe(res => {
        if (res.code === 0) {
          this.templates = res.data;
        }
      })
  }

  addTemplate = (template: ITemplate) => {
    this.httpService.post<any>(`open-component/add-to-template`, {draftId: template.draftId})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getList()))
  }

}
