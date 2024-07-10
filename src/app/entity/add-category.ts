import {NzUploadFile} from "ng-zorro-antd/upload";

export interface IAddCategory{
  appId: string;
  category: {
    first: number;
    second: number;
    certicates: {
      index: number;
      key: string;
      value: string;
      fileList: NzUploadFile[]
    }[];
  }
}
