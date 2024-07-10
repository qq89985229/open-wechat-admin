import {Component, inject, OnInit} from '@angular/core';
import {
  NzFormModule
} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {HttpParams} from "@angular/common/http";
import {IDomain} from "../../../entity/domain";
import {CommonService} from "../../../services/common.service";
import {IAuthorizer} from "../../../entity/authorizer";

@Component({
  selector: 'app-domain',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    FormsModule
  ],
  templateUrl: './domain.component.html'
})
export class DomainComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  validateForm: FormGroup<{
    requestDomain: FormControl<string>;
    wsRequestDomain: FormControl<string>;
    uploadDomain: FormControl<string>;
    downloadDomain: FormControl<string>;
  }> = this.fb.group({
    requestDomain: [''],
    wsRequestDomain: [''],
    uploadDomain: [''],
    downloadDomain: [''],
  });

  constructor(
    private nzModalRef: NzModalRef,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getDomain()
  }

  getDomain = () => {
    this.httpService.get<any>(`open-ma/get-domain`, new HttpParams().set("appId", this.authorizer.appId))
      .subscribe(res => {
        if (res.code === 0) {
          const domain: IDomain = res.data;
          const joinArray = (arr: string[]) => arr.join(',');
          this.validateForm.patchValue({requestDomain: joinArray(domain.requestDomain), wsRequestDomain: joinArray(domain.wsRequestDomain), uploadDomain: joinArray(domain.uploadDomain), downloadDomain: joinArray(domain.downloadDomain)})
        }
      })
  }

  submit = () :boolean => {
    if (this.validateForm.valid) {
      const {requestDomain, wsRequestDomain, uploadDomain, downloadDomain} = this.validateForm.value;

      const domain: IDomain = {
        requestDomain: requestDomain?.split(',') || [],
        wsRequestDomain: wsRequestDomain?.split(',') || [],
        uploadDomain: uploadDomain?.split(',') || [],
        downloadDomain: downloadDomain?.split(',') || []
      }
      this.httpService.post<any>(`open-ma/modify-domain`, {appId: this.authorizer.appId, ...domain})
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
