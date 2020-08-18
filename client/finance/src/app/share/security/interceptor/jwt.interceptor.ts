import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { ToastService } from '../../message/service/toast.service';

@Injectable({
  providedIn: 'root'
})

export class JwtInterceptor implements HttpInterceptor {
  /** Variables declraration for the data to be used */
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService, private toastService: ToastService) { }

    /** add auth header with jwt if user is logged in and request is to api url */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn  && isApiUrl  && currentUser  && request.url
       !== `${environment.apiUrl}/${environment.jwtRefresh}`
        && request.url !== `${environment.apiUrl}/${environment.jwtLogin}`
        ) {
        request = request.clone({withCredentials: true,
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }

     /** We do another check to see if refresh token failed
      * In this case we want to logout user and to redirect it to login page
      */
    return next.handle(request).pipe(catchError(error => {
      let errorMessage = '';
      if ( error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)
          && request.url === `${environment.apiUrl}/${environment.jwtRefresh}`) {
          this.authService.logout();
          errorMessage = `Error You are not Authorized:`;
        }
        else if (error instanceof HttpErrorResponse && error.status === 403) {
            return this.handle403Error(request, next);
        }else if (error.error instanceof ErrorEvent) {
          // errorMessage = `There is Client Error: ${error.error.message}`;
          if (error.status === 400) {
        errorMessage = `The Account with The Email Exist`;
          }
      }else {
          // errorMessage = `Server Error Status: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 404){
            errorMessage = `The User Not Found`;
          }else if (error.status === 401){
            errorMessage = `The Account Does Not Exist`;
          }else if (error.status === 400){
          errorMessage = `The Account with The Email Exist`;
          }else{
            errorMessage = 'Unknwon error try again';
          }
        }
      return throwError(errorMessage);
      }
      ));
}

/** 403 error handler method for requests to the API */
private handle403Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  /** Clone the request and add authorization header */
  private addToken(request: HttpRequest<any>, token: string): any {
    const currentUser = this.authService.currentUserValue;
    return request.clone({ withCredentials: true,
      setHeaders: {
        Authorization: `Bearer  ${currentUser.token}`
      }
    });
  }
}
