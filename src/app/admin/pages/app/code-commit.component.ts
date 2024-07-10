import {Component, inject, OnInit} from '@angular/core';
import {IAuthorizer} from "../../../entity/authorizer";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {ITemplate} from "../../../entity/template";
import {FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {
  NzFormModule
} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NgForOf} from "@angular/common";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-code-commit',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './code-commit.component.html'
})
export class CodeCommitComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  templates: ITemplate[] = [];
  validateForm: FormGroup<{
    template: FormControl<ITemplate>;
  }> = this.fb.group({
    template: [{} as ITemplate]
  });

  constructor(
    protected nzModalRef: NzModalRef,
    private fb: NonNullableFormBuilder,
    private commonService: CommonService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getTemplateList();
  }

  getTemplateList = () => {
    this.httpService.get<any>(`open-component/get-template-List`)
      .subscribe(res => {
        if (res.code === 0) {
          this.templates = res.data;
        }
      })
  }

  submit = () : boolean => {
    if (this.validateForm.valid) {
      const {template} = this.validateForm.value;
      this.httpService.post<any>(`open-ma/code-commit`, {appId: this.authorizer.appId, ...template, ext: this.authorizer.ext })
        .subscribe(res => this.commonService.resultCallback(res, () => {
          this.nzModalRef.destroy(true);
        }));
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
