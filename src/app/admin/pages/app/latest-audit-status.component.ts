import {Component, inject, OnInit} from '@angular/core';
import {IAuthorizer} from "../../../entity/authorizer";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {HttpService} from "../../../services/http.service";
import {ILatestAuditStatus} from "../../../entity/latest-audit-status";
import {NzTableModule} from "ng-zorro-antd/table";
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-latest-audit-status',
  standalone: true,
  imports: [
    NzTableModule,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    DatePipe,
    NgForOf,
    NzTagComponent
  ],
  templateUrl: './latest-audit-status.component.html'
})
export class LatestAuditStatusComponent implements OnInit{
  authorizer: IAuthorizer = inject(NZ_MODAL_DATA);
  latestAuditStatus: ILatestAuditStatus = {} as ILatestAuditStatus;

  constructor(
    private nzModalRef: NzModalRef,
    private messageService: NzMessageService,
    private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getLatestAuditStatus();
  }

  openUrl = (mediaId: string) => window.open(`${environment.apiUrl}/mp-material/get-image?appId=${this.authorizer.appId}&mediaId=${mediaId}`, '_blank');

  getLatestAuditStatus = () => {
    this.httpService.get<any>(`open-ma/get-latest-audit-status?appId=${this.authorizer.appId}`)
      .subscribe(res => {
        if (res.code === 0) {
          this.latestAuditStatus = res.data;
        }else {
          this.nzModalRef.destroy(true)
          this.messageService.create('error', res.message);
        }
      })
  }
}
