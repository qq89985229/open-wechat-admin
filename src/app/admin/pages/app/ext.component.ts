import {Component, inject, OnInit} from '@angular/core';
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {IAuthorizer} from "../../../entity/authorizer";
import {
  NzFormModule
} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {HttpService} from "../../../services/http.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-ext',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  templateUrl: './ext.component.html'
})
export class ExtComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  validateForm: FormGroup<{
    ext: FormControl<any>;
  }> = this.fb.group({
    ext: ['', [Validators.required]]
  });

  constructor(
    protected nzModalRef: NzModalRef,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.validateForm.patchValue({ext: JSON.stringify(this.authorizer.ext)})
  }

  submit = ():boolean => {
    if (this.validateForm.valid) {
      const {ext} = this.validateForm.value;
      this.authorizer.ext = JSON.parse(ext);
      this.httpService.post<any>(`authorizer/set-ext`, this.authorizer)
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
