import {Component, inject, OnInit} from '@angular/core';
import {IAuthorizer} from "../../../entity/authorizer";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {NzImageModule} from "ng-zorro-antd/image";
import {HttpService} from "../../../services/http.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-test-qrcode',
  standalone: true,
  imports: [
    NzImageModule
  ],
  templateUrl: './test-qrcode.component.html'
})
export class TestQrcodeComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  testQrcode: string = "";

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getBlob(`open-ma/get-test-qrcode`, new HttpParams().set('appId', this.authorizer.appId))
      .subscribe((res: any) =>  {
        if (res.body.type === 'image/jpeg'){
          this.testQrcode = window.URL.createObjectURL(res.body);
          console.log(this.testQrcode);
        }
      })
  }
}
