export interface TableParams {
  checked: boolean;  // 是否被选中，可双向绑定
  indeterminate: boolean;  // checkbox indeterminate 状态
  loading: boolean;  // 页面是否加载中
  total: number;  // 当前总数据，在服务器渲染时需要传入
  pageIndex: number;  // 当前页码，可双向绑定
  pageSize: number;  // 每页展示多少数据，可双向绑定
  checkedIds: Set<string>;  // 选中id
  nzPageSizeOptions: number[]; // 页数选择器可选值
}

export interface QueryParams{
  param: string;
  value: string;
}
