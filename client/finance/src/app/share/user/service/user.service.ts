import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserFeedback } from '../../model/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Adding content-type to the API endponts
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  /** POST: Register Mfi preliminary to the server */
  postFeedback(user: UserFeedback): Observable<UserFeedback> {
    const url = `${environment.apiUrl}` + '/mms/user/feedback/';
    return this.httpClient.post<UserFeedback>(url, user, this.httpOptions).pipe(
      tap((newMfi: UserFeedback) =>
        this.log(`added user feedback w/ id={postFeedback.id}`)
      ),
      catchError(this.handleError<UserFeedback>('postFeedback'))
    );
  }

  /** GET mfi from the server */
  getUserFeedback(): Observable<any[]> {
    const url = `${environment.apiUrl}` + '/mms/user/feedback/';
    return this.httpClient.get<UserFeedback[]>(url).pipe(
      tap((_) => 'fetched User Feedback'),
      catchError(this.handleError<UserFeedback[]>('getUser', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
  private handleError<T>(operation = 'operation', result?: T): any {
    return (errors: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(errors); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${errors.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string): any {
    // this.messageService.add(`MfiService: ${message}`);
  }
}
