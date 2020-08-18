import { Injectable } from '@angular/core';
import { MicrofiService } from '../service/microfi.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { empty, Observable, of } from 'rxjs';
import { Microfi } from 'src/app/share/model/models';

@Injectable({
  providedIn: 'root',
})
export class MicrofiResolverService {
  constructor(private microfiService: MicrofiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.microfiService.getAllMfi().pipe(
      tap((_) => this.log(`found all microfinance`)),
      catchError(this.handleError<Microfi>('foundMicrofi'))
    );
  }


  resolve2(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.microfiService.getAllMfi().pipe(
      tap((_) => this.log(`found all microfinance`)),
      catchError(this.handleError<Microfi>('foundMicrofi'))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string): any {
    // this.messageService.add(`MfiService: ${message}`);
  }
}
