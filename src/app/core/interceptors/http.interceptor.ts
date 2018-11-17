import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private _router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cloned;
        if (sessionStorage.getItem('jwt')) {
            cloned = request.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('jwt')
                }
            });
        } else {
            cloned = request.clone({
            });
        }
        return next.handle(cloned).pipe(tap(
            (evt) => {
                if (evt instanceof HttpResponse) {
                    const newTokens = evt.headers.get('x-auth-token');
                    console.log(newTokens);
                }

            }, err => {
                console.log(err);
                this._router.navigate(['/login']);
            }
        ));
    }

}
