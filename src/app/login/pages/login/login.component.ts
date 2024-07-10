import {Component, Inject, OnInit} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {HttpService} from "../../../services/http.service";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzIconModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private messageService: NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private iTokenService: ITokenService,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)){
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.httpService.post<any>('login', this.validateForm.value)
      .subscribe(res => {
        if (res.code === 0){
          this.iTokenService.set({token: res.data});
          this.router.navigateByUrl('/admin').then();
        }else {
          this.messageService.create(`error`, res.message);
        }
      });
  }

}

