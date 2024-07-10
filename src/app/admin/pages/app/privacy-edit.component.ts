import {Component, inject, OnInit} from '@angular/core';
import {
  NzFormModule
} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {IPrivacy} from "../../../entity/privacy";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-privacy-edit',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule
  ],
  templateUrl: './privacy-edit.component.html'
})
export class PrivacyEditComponent implements OnInit{
  privacy: IPrivacy = inject(NZ_MODAL_DATA);
  validateForm: FormGroup<{
    privacyKey: FormControl<string>;
    privacyDesc: FormControl<string>;
  }> = this.fb.group({
    privacyKey: ['', [Validators.required]],
    privacyDesc: ['', [Validators.required]],
  });

  constructor(protected nzModalRef: NzModalRef,
              private fb: NonNullableFormBuilder,
              private commonService: CommonService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.validateForm.patchValue({...this.privacy})
  }

  submit = () :boolean => {
    if (this.validateForm.valid) {
      const privacy = {...this.privacy, ...this.validateForm.value};
      this.httpService.post<any>(`privacy`, privacy)
        .subscribe(res => this.commonService.resultCallback(res, () => this.nzModalRef.destroy(true)));
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
