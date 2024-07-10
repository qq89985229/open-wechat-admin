import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {IAuthorizer} from "../../../entity/authorizer";
import {NzTableModule, NzTableQueryParams} from "ng-zorro-antd/table";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {DatePipe, NgForOf} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProAuthUrlComponent} from "./pro-auth-url.component";
import {FastRegisterComponent} from "./fast-register.component";
import {HttpParams} from "@angular/common/http";
import {CategoryComponent} from "./category.component";
import {TableParams} from "../../../entity/common";
import {QueryParamsService} from "../../../services/query-params.service";
import {DomainComponent} from "./domain.component";
import {WebViewDomainComponent} from "./web-view-domain.component";
import {ExtComponent} from "./ext.component";
import {PrivacySettingComponent} from "./privacy-setting.component";
import {CodeCommitComponent} from "./code-commit.component";
import {PageListComponent} from "./page-list.component";
import {TestQrcodeComponent} from "./test-qrcode.component";
import {BindTesterComponent} from "./bind-tester.component";
import {TesterListComponent} from "./tester-list.component";
import {AddCategoryComponent} from "./add-category.component";
import {AccountBasicInfoComponent} from "./account-basic-info.component";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {CommonService} from "../../../services/common.service";
import {LatestAuditStatusComponent} from "./latest-audit-status.component";

@Component({
  selector: 'app-authorizer',
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
  ],
  templateUrl: './authorizer.component.html'
})
export class AuthorizerComponent implements OnInit {
  authorizers: IAuthorizer[] = []
  tableParams: TableParams = {pageIndex: 1, pageSize: 1000, nzPageSizeOptions: [1000]} as TableParams;
  queryParams: HttpParams = new HttpParams();
  constructor(
    private modalService: NzModalService,
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
    this.httpService.get<any>(`authorizer`, this.queryParams)
      .subscribe(res => {
        if (res.code === 0) {
          const data = res.data;
          this.tableParams =  {...this.tableParams, loading: false, total: data.totalElements, pageIndex: data.number + 1, pageSize: data.size}
          this.authorizers = res.data.content;
        }
      })
  }

  // 快速创建
  fastRegister = () => {
    this.modalService.create({
      nzTitle: "快速创建",
      nzCentered: true,
      nzContent: FastRegisterComponent,
      nzOnOk: instance => instance.submit(),
    });
  }

  // 扫码绑定
  getPreAuthUrl = () => {
    this.httpService.get<any>(`open-component/get-pre-auth-url`)
      .subscribe(res => {
        if (res.code === 0) {
          this.modalService.create({
            nzTitle: "扫码绑定",
            nzCentered: true,
            nzContent: ProAuthUrlComponent,
            nzData: {preAuthUrl: res.data},
            nzFooter: null
          });
        }
      })
  }

  // 获取小程序基本信息
  getAccountBasicInfo = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "小程序基本信息",
      nzCentered: true,
      nzWidth: 800,
      nzContent: AccountBasicInfoComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 获取类目
  getCategory = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "服务类目",
      nzCentered: true,
      nzContent: CategoryComponent,
      nzData: authorizer,
    });
  }

  // 添加类目
  addCategory = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "添加类目",
      nzCentered: true,
      nzContent: AddCategoryComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 配置服务器域名
  setDomain = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "配置服务器域名",
      nzCentered: true,
      nzContent: DomainComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 配置业务域名
  setWebViewDomain = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "配置业务域名",
      nzCentered: true,
      nzContent: WebViewDomainComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 设置ext
  setExt = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "配置ext",
      nzCentered: true,
      nzContent: ExtComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 设置ext
  setPrivacySetting = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "配置隐私保护",
      nzCentered: true,
      nzContent: PrivacySettingComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 页面列表
  getPageList = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "页面列表",
      nzCentered: true,
      nzContent: PageListComponent,
      nzData: authorizer,
    });
  }

  // 上传代码
  codeCommit = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "上传代码",
      nzCentered: true,
      nzContent: CodeCommitComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 获得体验者列表
  getTesterList = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "获得体验者列表",
      nzCentered: true,
      nzWidth: 650,
      nzContent: TesterListComponent,
      nzData: authorizer
    });
  }

  // 绑定小程序体验者
  bindTester = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "绑定小程序体验者",
      nzCentered: true,
      nzContent: BindTesterComponent,
      nzData: authorizer,
      nzOnOk: instance => instance.submit()
    });
  }

  // 获取体验小程序的体验二维码
  getTestQrcode = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "体验二维码",
      nzCentered: true,
      nzContent: TestQrcodeComponent,
      nzData: authorizer,
    });
  }

  // 提交审核
  submitAudit = (authorizer: IAuthorizer) => {
    this.httpService.post<any>(`open-ma/submit-audit`, {appId: authorizer.appId})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getList()));
  }

  // 小程序审核撤回
  undoCodeAudit = (authorizer: IAuthorizer) => {
    this.httpService.post<any>(`open-ma/undo-code-audit`, {appId: authorizer.appId})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getList()));
  }

  // 查询最新一次提交的审核状态
  getLatestAuditStatus = (authorizer: IAuthorizer) => {
    this.modalService.create({
      nzTitle: "审核状态",
      nzCentered: true,
      nzContent: LatestAuditStatusComponent,
      nzData: authorizer,
    });
  }

  // 删除授权账号
  deleteById = (authorizer: IAuthorizer) => {
    this.httpService.delete<any>(`authorizer`, {appId: authorizer.id})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getList()));
  }

  // 修改授权账号详情
  updateAuthorizerInfo = (authorizer: IAuthorizer) => {
    this.httpService.post<any>(`authorizer/update-authorize-info`, {appId: authorizer.appId})
      .subscribe(res => this.commonService.resultCallback(res, () => this.getList()));
  }

}
