import {Component, inject, OnInit} from '@angular/core';
import {NzCascaderModule, NzCascaderOption} from "ng-zorro-antd/cascader";
import {FormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {HttpService} from "../../../services/http.service";
import {IAuthorizer} from "../../../entity/authorizer";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpParams} from "@angular/common/http";
import {IAllCategory} from "../../../entity/all-category";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzUploadChangeParam, NzUploadFile, NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {NgForOf, NgIf} from "@angular/common";
import {NzListModule} from "ng-zorro-antd/list";
import {NzButtonModule} from "ng-zorro-antd/button";
import {IAddCategory} from "../../../entity/add-category";
import {CommonService} from "../../../services/common.service";
import {UploadService} from "../../../services/upload.service";

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    NzCascaderModule,
    FormsModule,
    NzFormModule,
    NzAlertModule,
    NzRadioModule,
    NzUploadModule,
    NzIconModule,
    NgForOf,
    NgIf,
    NzListModule,
    NzButtonModule
  ],
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent implements OnInit {
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  values: number[] | null = null;
  allCategoryList: IAllCategory[] = [];
  options: NzCascaderOption[] = [];
  allCategory: IAllCategory = {} as IAllCategory;
  addCategory: IAddCategory = {appId: this.authorizer.appId, category: {}} as IAddCategory;
  uploadUrl = environment.apiUrl + '/mp-material/media-upload';

  onChanges(values: number[]): void {
    const secondId= values[values.length - 1];
    this.allCategory = this.allCategoryList.find(({id}) => id === secondId) || {} as IAllCategory;
    this.addCategory = {appId: this.authorizer.appId, category: {}} as IAddCategory;
    this.addCategory.category.first = values[0];
    if (values.length > 1) this.addCategory.category.second = values[1];
    if (this.allCategory.sensitive_type === 1) this.addCategory.category.certicates = [];
  }

  constructor(
    protected nzModalRef: NzModalRef,
    private messageService: NzMessageService,
    private uploadService: UploadService,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAllCategoryList();
  }

  setOptions = () => {
    const secondOptionsMap = this.allCategoryList.filter(({level}) => level === 2)
      .reduce((map, allCategory) => {
      if (!map.has(allCategory.father)) {
        map.set(allCategory.father, []);
      }
        // 获取对应的数组
        const children = map.get(allCategory.father)!;
        if (children) {
          children.push({
            value: allCategory.id,
            label: allCategory.name,
            isLeaf: true
          });
        }
        return map;
    }, new Map<number, NzCascaderOption[]>());

    this.options = this.allCategoryList.filter(({level}) => level === 1)
      .map(({id, name}) => ({value: id, label: name,  children: secondOptionsMap.get(id) || [], isLeaf: !secondOptionsMap.has(id)}));
  }

  getAllCategoryList = () => {
    this.httpService.get<any>(`open-ma-basic/get-all-category`, new HttpParams().set("appId", this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) {
          this.allCategoryList = res.data.categories_list.categories;
          this.setOptions();
        }
      })
  }

  setCertificates = (inners: {name: string}[]) => this.addCategory.category.certicates = inners.map(({name}, index) => ({index, key: name, value: "", fileList: []}));

  openUrl = (url: string) => window.open(url, '_blank');

  beforeUpload = (file: NzUploadFile): Observable<boolean> => this.uploadService.beforeUpload(file);

  // 上传表单
  uploadFile = (info: NzUploadChangeParam, index: number) => this.uploadService.uploadFile(info, () => {
    this.addCategory.category.certicates[index].value = info.file.response.data.mediaId
    this.addCategory.category.certicates[index].fileList = [{
      url: `${environment.apiUrl}/mp-material/get-image?appId=${this.authorizer.appId}&mediaId=${info.file.response.data.mediaId}`,
      uid: `${info.file.response.data.mediaId}`,
      name: `${info.file.response.data.mediaId}`
    }];
  })

  validateCertificates = (certificates: { key: string; value: string }[]): boolean => {
    for (const certificate of certificates) {
      if (!certificate.key || !certificate.value) return false;
    }
    return true;
  }

  submit = (): boolean => {
    const addCategory = this.addCategory;
    if (!addCategory.category || !addCategory.category.first) {
      this.messageService.create('error', '请选择类目!');
      return false;
    }
    if (addCategory.category.certicates && addCategory.category.certicates.length === 0) {
      this.messageService.create('error', '请选择资质');
      return false;
    }

    if (addCategory.category.certicates && addCategory.category.certicates.length > 0 && !this.validateCertificates(addCategory.category.certicates)) {
      this.messageService.create('error', '资质文件必须上传完整');
      return false;
    }

    this.httpService.post<any>(`open-ma-basic/add-category`, this.addCategory)
      .subscribe(res => this.commonService.resultCallback(res, () => this.nzModalRef.destroy(true)))
    return false;
  }

}
