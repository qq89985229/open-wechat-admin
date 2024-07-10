import {HttpErrorResponse, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {inject} from "@angular/core";
import {catchError, map, throwError} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const iTokenService: ITokenService = inject(DA_SERVICE_TOKEN);
  const router: Router = inject(Router);
  const messageService: NzMessageService = inject(NzMessageService);
  const token = iTokenService.get()?.token;
  if (token) {
    req = req.clone({
      setHeaders: {
        token
      }
    });
  }
  return next(req)
    .pipe(catchError((error: HttpErrorResponse) => {
      iTokenService.clear();
      messageService.create('info', "认证失败");
      setTimeout(() =>   router.navigateByUrl('/login').then(), 3000);
      return throwError(() =>'Custom error message');
    }))
    .pipe(map((resp: any) => {
      if (resp instanceof HttpResponse) {
      }
      return resp;
    }));
};
