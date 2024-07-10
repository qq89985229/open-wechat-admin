import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {
  NzFormModule
} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {HttpParams} from "@angular/common/http";
import {IWebViewDomain} from "../../../entity/web-view-domain";
import {CommonService} from "../../../services/common.service";
import {IAuthorizer} from "../../../entity/authorizer";

@Component({
  selector: 'app-web-view-domain',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    FormsModule
  ],
  templateUrl: './web-view-domain.component.html'
})
export class WebViewDomainComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  validateForm: FormGroup<{
    webviewdomainList: FormControl<string>;
  }> = this.fb.group({
    webviewdomainList: ['']
  });

  constructor(
    protected nzModalRef: NzModalRef,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getWebViewDomain()
  }

  getWebViewDomain = () => {
    this.httpService.get<any>(`open-ma/get-web-view-domain`, new HttpParams().set("appId", this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) {
          const webViewDomain: IWebViewDomain = res.data;
          const joinArray = (arr: string[]) => arr.join(',');
          this.validateForm.patchValue({webviewdomainList: joinArray(webViewDomain.webviewdomainList)})
        }
      })
  }

  submit = () :boolean => {
    if (this.validateForm.valid) {
      const {webviewdomainList} = this.validateForm.value;

      const webViewDomain: IWebViewDomain = {
        webviewdomainList: webviewdomainList?.split(',') || [],
      }
      this.httpService.post<any>(`open-ma/set-web-view-domain`, {appId: this.authorizer.appId, ...webViewDomain})
        .subscribe(res => this.commonService.resultCallback(res, () => this.nzModalRef.destroy(true)))
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    return false;
  }
}
