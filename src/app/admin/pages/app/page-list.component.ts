import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {IAuthorizer} from "../../../entity/authorizer";
import {HttpParams} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {NzListModule} from "ng-zorro-antd/list";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [
    NgForOf,
    NzListModule,
    NzPopconfirmModule
  ],
  templateUrl: './page-list.component.html'
})
export class PageListComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  pages: string[] = [];
  constructor(
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getPageList();
  }

  getPageList = () => {
    this.httpService.get<any>(`open-ma/get-page-list`, new HttpParams().set('appId', this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) {
          this.pages = res.data.pageList;
        }
      })
  }



}
