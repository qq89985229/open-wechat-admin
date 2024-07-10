import {Component, Inject} from '@angular/core';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {AsyncPipe, NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzDropDownModule,
    NzAvatarModule,
    NzDividerModule,
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    NzPopconfirmModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(
    @Inject(DA_SERVICE_TOKEN) private iTokenService: ITokenService,
    private router: Router
  ) { }
  isCollapsed = false;
  logout = () =>{
    this.iTokenService.clear();
    setTimeout(() => this.router.navigateByUrl('/login').then(), 3000);
  }
}
