import { Component } from '@angular/core';
import {NzFormModule} from "ng-zorro-antd/form";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-fast-register',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule
  ],
  templateUrl: './fast-register.component.html'
})
export class FastRegisterComponent {
  validateForm: FormGroup<{
    name: FormControl<string>;
    code: FormControl<string>;
    codeType: FormControl<string>;
    legalPersonaWechat: FormControl<string>;
    legalPersonaName: FormControl<string>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    codeType: ['', [Validators.required]],
    legalPersonaWechat: ['', [Validators.required]],
    legalPersonaName: ['', [Validators.required]],
  });

  constructor(
    protected nzModalRef: NzModalRef,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  submit = () :boolean => {
    if (this.validateForm.valid) {
      const value = this.validateForm.value;
      this.httpService.post<any>(`open-component/fast-register`, value)
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
