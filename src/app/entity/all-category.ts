export interface IAllCategory{
  id: number;
  name: string;
  level: number;
  father: number;
  children: number[];
  sensitive_type: number;
  scope: string;
  qualify: {
    remark: string;
    exter_list: {
      inner_list: {
        name: string;
        url: string;
      }[]
    }[]
  }
}


