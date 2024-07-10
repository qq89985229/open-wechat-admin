import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {QueryParams} from "../entity/common";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private queryParams = new BehaviorSubject<HttpParams>(new HttpParams());
  queryParams$ = this.queryParams.asObservable();

  constructor() {
  }

  // 初始化查询参数
  initQueryParams(page: string, size: string): void{
    const queryParams = new HttpParams()
      .set('page', page)
      .set('size', size);
    this.queryParams.next(queryParams);
  }

  // 查询参数改变
  updateQueryParams(params: NzTableQueryParams, callback?: () => void): void {
    const {pageIndex, pageSize} = params;
    this.setQueryParamsByMultiple(
      [
        {param: 'page', value: pageIndex.toString()},
        {param: 'size', value: pageSize.toString()}
      ]);
    if (callback) callback();
  }

  // 清空查询参数
  clearQueryParams(): void{
    const queryParams = new HttpParams();
    this.queryParams.next(queryParams);
  }

  // 设置单个查询参数
  setQueryParams(param: string, value: string): void {
    let queryParams = this.queryParams.getValue();
    queryParams = queryParams.set(param, value);
    this.queryParams.next(queryParams);
  }

  // 设置多个查询参数
  setQueryParamsByMultiple(paramsArr: QueryParams[]): void{
    paramsArr.forEach(params => {
      let queryParams = this.queryParams.getValue();
      queryParams = queryParams.set(params.param, params.value);
      this.queryParams.next(queryParams);
    });
  }
}
