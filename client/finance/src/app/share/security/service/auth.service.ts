import { Injectable } from '@angular/core';
import { Microfi } from '../../model/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** http options used for making API calls */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** The currentUser Subject for user data storage */
  private currentUserSubject: BehaviorSubject<Microfi>;
  public currentUser: Observable<Microfi>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Microfi>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Microfi {
    return this.currentUserSubject.value;
  }

  /** Login method to server API for Authorization */
  public login(user: Microfi[]): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/${environment.jwtLogin}`, user, {withCredentials: true})
      .pipe(
        map((response) => {
          // login successful if there's a jwt token in the response
          let currentUser: Microfi;
          if (response.access) {
            /** store user details and jwt token in local storage
             *  to keep user logged in between page refreshes
             */
            currentUser = jwtDecode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = response.refresh;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          }
          return currentUser;
        })
      );
  }

  /** Refresh token from server after expire time */
  public refreshToken(): Observable<any> {
    console.log('this.currentUserValue.refreshToken');
    console.log(this.currentUserValue.refreshToken);
    const refreshToken = this.currentUserValue.refreshToken;
    return this.http
      .post<any>(`${environment.apiUrl}/mms/token/refresh/`, {
        refresh: refreshToken,
      }, {withCredentials: true})
      .pipe(
        map((response) => {
          // login successful if there's a jwt token in the response
          let currentUser: Microfi;
          if (response.access) {
            /**
             * store user details and jwt token in local storage to keep user
             *  logged in between page refreshes
             */
            currentUser = jwtDecode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = response.refresh;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          }
          return currentUser;
        }),
        tap((_) => this.log('user logged in successfully')),
        catchError(this.handleError<any>('userLogin', []))
      );
  }

  /** Logout user from the server and blacklist token */
  logout(): Observable<any> {
    const url = `${environment.apiUrl}/mms/auth/logout/`;
    return this.http
      .post(url, { refresh_token: localStorage.getItem('refreshToken') }, {withCredentials: true})
      .pipe(
        map((response) => {
          // logout successful remove token from local storage
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }),
        tap((_) => this.log('user logged out successfully')),
        catchError(this.handleError<any>('userLogout', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
   handleError<T>(operation = 'operation', result?: T): any {
    return (errors: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(ErrorStateMatcher); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${errors.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Service message with the MessageService */
  private log(message: string): any {
    //  this.messageService.add(`MfiService: ${message}`);
  }
}
