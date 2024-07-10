import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {ICategory} from "../../../entity/category";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzListModule} from "ng-zorro-antd/list";
import {HttpParams} from "@angular/common/http";
import {HttpService} from "../../../services/http.service";
import {IAuthorizer} from "../../../entity/authorizer";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NzPopconfirmModule,
    NzListModule
  ],
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  category: ICategory = {} as ICategory;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory = () => {
    this.httpService.get<any>(`open-ma-basic/get-category`, new HttpParams().set("appId", this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) this.category =  res.data;
      })
  }

  deleteCategory = (category: any) => {
    this.httpService.delete<any>(`open-ma-basic/delete-category`, {appId: this.authorizer.appId, first: category.first, second: category.second})
      .subscribe(res => {
        if (res.code === 0) this.getCategory();
      })
  }

}
