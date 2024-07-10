import {Component, OnInit} from '@angular/core';
import {ITemplate} from "../../../entity/template";
import {HttpService} from "../../../services/http.service";
import {NzTableModule} from "ng-zorro-antd/table";
import {DatePipe, NgForOf} from "@angular/common";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-template',
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
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit{
  templates: ITemplate[] = []
  constructor(
    private httpService: HttpService,
    private commonService : CommonService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList = () => {
    this.httpService.get<any>(`open-component/get-template-List`)
      .subscribe(res => {
        if (res.code === 0) {
          this.templates = res.data;
        }
      })
  }

  delete = (template: ITemplate) => {
    this.httpService.delete<any>(`open-component/delete-template`, {templateId: template.templateId})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getList()))
  }

}
