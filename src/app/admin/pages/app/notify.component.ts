import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {INotify} from "../../../entity/notify";
import {TableParams} from "../../../entity/common";
import {HttpParams} from "@angular/common/http";
import {CommonService} from "../../../services/common.service";
import {QueryParamsService} from "../../../services/query-params.service";
import {NzTableModule, NzTableQueryParams} from "ng-zorro-antd/table";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {DatePipe, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [
    NzSpaceModule,
    NgForOf,
    DatePipe,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzTableModule,
    NzPopconfirmDirective,
    NgSwitchCase,
    NgSwitch,
  ],
  templateUrl: './notify.component.html'
})
export class NotifyComponent implements OnInit{
  notifyList: INotify[] = [];
  tableParams: TableParams = {pageIndex: 1, pageSize: 1000, nzPageSizeOptions: [1000]} as TableParams;
  queryParams: HttpParams = new HttpParams();
  constructor(
    private commonService: CommonService,
    private queryParamsService: QueryParamsService,
    private httpService: HttpService) {
  }
  ngOnInit(): void {
    this.queryParamsService.queryParams$.subscribe(queryParams => this.queryParams = queryParams);
    this.queryParamsService.initQueryParams('1', '1000');
    this.getList();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => this.queryParamsService.updateQueryParams(params, () => this.getList());

  getList = () => {
    this.httpService.get<any>(`notify`, this.queryParams)
      .subscribe(res => {
        const data = res.data;
        this.tableParams =  {...this.tableParams, loading: false, total: data.totalElements, pageIndex: data.number + 1, pageSize: data.size}
        this.notifyList = res.data.content;
      })
  }

}
