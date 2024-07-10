import {Injectable} from '@angular/core';
import {TableParams} from "../entity/common";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  // 刷新状态
  refreshCheckedStatus(tableParams: TableParams, list: any[]): TableParams{
    const checked = list.every(({id}) => tableParams.checkedIds.has(id));
    const indeterminate = list.some(({id}) => tableParams.checkedIds.has(id)) && !tableParams.checked;
    return {...tableParams, checked, indeterminate};
  }
}
