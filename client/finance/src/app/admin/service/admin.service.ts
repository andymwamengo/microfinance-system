import { Injectable } from '@angular/core';
import { ToastService } from '../../share/message/service/toast.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AdminFeedback } from 'src/app/share/model/models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  /**
   * Adding content-type to the API endponts
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private httpClient: HttpClient,
    private messageService: ToastService
  ) {}

  /** POST: add a new admin feedback to the server */
  saveAdminFeedback(adminFeedback: AdminFeedback): Observable<AdminFeedback> {
    const url = `${environment.apiUrl}` + '/mms/admin/report/send/';
    return this.httpClient
      .post<AdminFeedback>(url, adminFeedback, this.httpOptions)
      .pipe(
        tap((newAdminFeedback: AdminFeedback) =>
          this.log(`added admin feedback w/ `)
        ), // id=${newAdminFeedback.id}
        catchError(this.handleError<AdminFeedback>('addAdminFeddback'))
      );
  }

  /** GET Admin feedback from the server */
  getAdminFeedback(): Observable<AdminFeedback[]> {
    const url = `${environment.apiUrl}` + '/mms/admin/report/send/';
    return this.httpClient.get<AdminFeedback[]>(url).pipe(
      tap((_) => this.log('fetched admin feedback')),
      catchError(this.handleError<AdminFeedback[]>('getAdminFeedback', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): any {
    // this.messageService.add(`MfiService: ${message}`);
  }
}
