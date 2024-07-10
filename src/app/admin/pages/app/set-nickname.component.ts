import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {IAccountBasicInfo} from "../../../entity/account-basic-info";
import {NzMessageService} from "ng-zorro-antd/message";
import {NgIf} from "@angular/common";
import {NzTagModule} from "ng-zorro-antd/tag";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-set-nickname',
  standalone: true,
  imports: [
    FormsModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NgIf,
    NzTagModule,
  ],
  templateUrl: './set-nickname.component.html'
})
export class SetNicknameComponent implements OnInit{
  accountBasicInfo: IAccountBasicInfo = inject(NZ_MODAL_DATA);
  nicknameAvailable = false;
  validateForm: FormGroup<{
    nickname: FormControl<string>;
  }> = this.fb.group({
    nickname: ['', [Validators.required]],
  });

  constructor(
    private nzModalRef: NzModalRef,
    private messageService: NzMessageService,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.validateForm.patchValue({nickname: this.accountBasicInfo.nickname});
    this.validateForm.get('nickname')?.valueChanges.subscribe(res => this.nicknameAvailable = false)
  }

  checkNickname = () => {
    if (this.validateForm.valid) {
      const {nickname} = this.validateForm.value;
      this.httpService.post<any>(`open-ma-basic/check-nickname`, {appId: this.accountBasicInfo.appId, nickname})
        .subscribe(res => {
          if (res.code === 0){
            if (res.data.hitCondition) {
              this.nicknameAvailable = true;
            }else {
              this.messageService.create('error', '该小程序名称不可用');
            }
          }else {
            this.messageService.create('error', res.message);
          }
        })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submit = () :boolean => {
    if (!this.nicknameAvailable) {
      this.messageService.create('error', '名称检测通过后方可修改');
      return false;
    }
    if (this.validateForm.valid) {
      const {nickname} = this.validateForm.value;
      this.httpService.post<any>(`open-ma-basic/set-nickname`, {appId: this.accountBasicInfo.appId, nickname})
        .subscribe(res => this.commonService.resultCallback(res, () => {
          this.nzModalRef.destroy(true);
        }))
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
