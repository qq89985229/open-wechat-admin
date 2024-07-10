import {Component, inject} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  NzFormModule
} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {IAuthorizer} from "../../../entity/authorizer";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-bind-tester',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './bind-tester.component.html'
})
export class BindTesterComponent {
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  validateForm: FormGroup<{
    wechatId: FormControl<string>;
  }> = this.fb.group({
    wechatId: ['', [Validators.required]]
  });

  constructor(
    private nzModalRef: NzModalRef,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  submit = (): boolean => {
    if (this.validateForm.valid) {
      const {wechatId} = this.validateForm.value;
      this.httpService.post<any>(`open-ma/bind-tester`, {appId: this.authorizer.appId, wechatId})
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
