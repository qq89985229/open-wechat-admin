import {Component, inject, OnInit} from '@angular/core';
import {
  NzFormModule
} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {IAccountBasicInfo} from "../../../entity/account-basic-info";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {CommonService} from "../../../services/common.service";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-modify-signature',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  templateUrl: './modify-signature.component.html'
})
export class ModifySignatureComponent implements OnInit{
  accountBasicInfo: IAccountBasicInfo = inject(NZ_MODAL_DATA);

  validateForm: FormGroup<{
    signature: FormControl<any>;
  }> = this.fb.group({
    signature: ['', [Validators.required]]
  });

  constructor(
    protected nzModalRef: NzModalRef,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.validateForm.patchValue({signature: this.accountBasicInfo.signatureInfo.signature})
  }

  submit = ():boolean => {
    if (this.validateForm.valid) {
      const {signature} = this.validateForm.value;
      this.httpService.post<any>(`open-ma-basic/modify-signature`, {appId: this.accountBasicInfo.appId, signature})
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
