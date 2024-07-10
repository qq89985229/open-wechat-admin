import {Component, inject} from '@angular/core';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-pro-auth-url',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './pro-auth-url.component.html'
})
export class ProAuthUrlComponent {
   nzModalData: any = inject(NZ_MODAL_DATA);
}
