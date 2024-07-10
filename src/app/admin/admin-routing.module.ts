import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizerComponent} from "./pages/app/authorizer.component";
import {NotifyComponent} from "./pages/app/notify.component";
import {TemplateComponent} from "./pages/template/template.component";
import {DraftComponent} from "./pages/template/draft.component";
import {PrivacyComponent} from "./pages/app/privacy.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/authorizer'
  },
  {
    path: 'template',
    data: {
      breadcrumb: '模版',
    },
    children: [
      {
        path: 'draft',
        data: {
          breadcrumb: '草稿箱',
        },
        component: DraftComponent
      },
      {
        path: 'template',
        data: {
          breadcrumb: '模版库',
        },
        component: TemplateComponent
      },
    ]
  },
  {
    path: 'app',
    data: {
      breadcrumb: '小程序',
    },
    children: [
      {
        path: 'privacy',
        data: {
          breadcrumb: '隐私保护',
        },
        component: PrivacyComponent
      },
      {
        path: 'authorizer',
        data: {
          breadcrumb: '授权列表',
        },
        component: AuthorizerComponent,
      },
      {
        path: 'notify',
        data: {
          breadcrumb: '微信通知',
        },
        component: NotifyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
