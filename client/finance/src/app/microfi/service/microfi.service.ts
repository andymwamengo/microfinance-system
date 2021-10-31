/**
 * The mfi service for handling create read update and destroy data from/to api
 * containing the followings methods
 * create|read|update|delete for mfi, stakeholder, board, reports and address
 */
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Address,
  Stakeholder,
  Board,
  MfiReport,
} from 'src/app/share/model/models';
import { Microfi, License } from '../../share/model/models';

@Injectable({
  providedIn: 'root',
})
export class MicrofiService {
  /**
   * Adding content-type to the API endponts
   */
  private licenseUrl = '../../assets/json/brela_license.json'; // JSON to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  /** GET License from the server */
  getLicense(): Observable<License[]> {
    return this.httpClient.get<License[]>(this.licenseUrl).pipe(
      tap((_) => this.log('fetched license')),
      catchError(this.handleError<License[]>('getLicense', []))
    );
  }

  /** POST: Register Microfi preliminary to the server */
  registerMfi(microfi: Microfi): Observable<Microfi> {
    const url = `${environment.apiUrl}` + '/mms/user/register/';
    return this.httpClient.post<Microfi>(url, microfi, this.httpOptions).pipe(
      tap((newMfi: Microfi) => this.log(`added mfi w/ id=${newMfi.id}`)),
      catchError(this.handleError<Microfi>('registerMicrofi'))
    );
  }

  /** GET Microfi by id. Will 404 if id not found */
  getMfiById(id: number): Observable<Microfi> {
    const url = `${environment.apiUrl}` + '/mms/user/' + id;
    return this.httpClient.get<Microfi>(url).pipe(
      tap((_) => this.log(`fetched Microfi id=${id}`)),
      catchError(this.handleError<Microfi>(`getMicrofi id=${id}`))
    );
  }

  /** GET Microfi from the server */
  getAllMfi(): Observable<Microfi[]> {
    const url = `${environment.apiUrl}` + '/mms/user/list/';
    return this.httpClient.get<Microfi[]>(url).pipe(
      tap((_) => 'fetched Microfi'),
      catchError(this.handleError<Microfi[]>('getMicrofi', []))
    );
  }

  /** DELETE: delete the User from the server */
  deleteMfi(microfi: Microfi | string): Observable<Microfi> {
    const id = typeof microfi === 'string' ? microfi : microfi.id;
    const url = `${environment.apiUrl}` + '/mms/user/' + id;

    return this.httpClient.delete<Microfi>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted Microfi id=${id}`)),
      catchError(this.handleError<Microfi>('deleteMicrofi'))
    );
  }

  /** PUT: update the Microfi on the server */
  updateMfi(id: any, microfi: Partial<Microfi>): Observable<any> {
    const url = `${environment.apiUrl}/mms/user/${id}`;
    return this.httpClient.patch(url, microfi, this.httpOptions).pipe(
      tap((_) => this.log(`updated Microfi id=${microfi.id}`)),
      catchError(this.handleError<any>('updateMicrofi'))
    );
  }

  /** POST: add a new Microfi address to the server */
  registerMfiAddress(address: Address): Observable<Address> {
    const url = `${environment.apiUrl}` + '/mms/address/register/';
    return this.httpClient.post<Address>(url, address, this.httpOptions).pipe(
      tap((newAddress: Address) => this.log(`added mfi address w/`)),
      catchError(this.handleError<Address>('addMfiAddress'))
    );
  }

  /** GET Microfi address from the server */
  getMfiAddress(): Observable<Address[]> {
    const url = `${environment.apiUrl}` + '/mms/address/register/';
    return this.httpClient.get<Address[]>(url).pipe(
      tap((_) => this.log('fetched mfi address')),
      catchError(this.handleError<Address[]>('getMfiAddress', []))
    );
  }

  /** PATCH: update the Microfi Address on the server */
  updateMfiAddress(id: number | string, address: Address): Observable<any> {
    const url = `${environment.apiUrl}/mms/address/${id}`;
    return this.httpClient.patch(url, address, this.httpOptions).pipe(
      tap((_) => this.log(`updated address id=${address.id}`)),
      catchError(this.handleError<any>('updateAddress'))
    );
  }

  /** DELETE: delete the Microfi Address from the server */
  deleteMfiAddress(address: Address | number): Observable<Address> {
    const id = typeof address === 'number' ? address : address.id;
    const url = `${environment.apiUrl}` + '/mms/address/' + id;

    return this.httpClient.delete<Address>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted address id=${id}`)),
      catchError(this.handleError<Address>('deleteAddress'))
    );
  }

  /** POST: add a new stakeholder to the server */
  registerMfiStakeholder(stakeholder: Stakeholder): Observable<Stakeholder> {
    const url = `${environment.apiUrl}` + '/mms/stakeholder/register/';
    return this.httpClient
      .post<Stakeholder>(url, stakeholder, this.httpOptions)
      .pipe(
        tap((newStakeholder: Stakeholder) =>
          this.log(`added stakeholder w/ id=`)
        ),
        catchError(this.handleError<Stakeholder>('addStakeholder'))
      );
  }

  /** GET stakeholder from the server */
  getMfiStakeholder(): Observable<Stakeholder[]> {
    const url = `${environment.apiUrl}` + '/mms/stakeholder/register/';
    return this.httpClient.get<Stakeholder[]>(url).pipe(
      tap((_) => this.log('fetched Stakeholder')),
      catchError(this.handleError<Stakeholder[]>('getStakeholder', []))
    );
  }

  /** PATCH: update the Microfi Stakeholder on the server */
  updateMfiStakeholder(id: any, stakeholder: Stakeholder): Observable<any> {
    const url = `${environment.apiUrl}/mms/stakeholder/${id}`;
    return this.httpClient.patch(url, stakeholder, this.httpOptions).pipe(
      tap((_) => this.log(`updated stakeholder id=`)),
      catchError(this.handleError<any>('updateStakeholder'))
    );
  }

  /** POST: add a new Microfi board to the server */
  registerMfiBoard(board: Board): Observable<Board> {
    const url = `${environment.apiUrl}` + '/mms/board/register/';
    return this.httpClient.post<Board>(url, board, this.httpOptions).pipe(
      tap((newBoard: Board) => this.log(`added mfi board w/ id=`)),
      catchError(this.handleError<Board>('addMfiBoard'))
    );
  }

  /** GET Microfi board from the server */
  getMfiBoard(): Observable<Board[]> {
    const url = `${environment.apiUrl}` + '/mms/board/register/';
    return this.httpClient.get<Board[]>(url).pipe(
      tap((_) => this.log('fetched mfi board')),
      catchError(this.handleError<Board[]>('getMfiBoard', []))
    );
  }

  /** PATCH: update the Microfi Board on the server */
  updateMfiBoard(id: any, board: Board): Observable<any> {
    const url = `${environment.apiUrl}/mms/board/${id}`;
    return this.httpClient.patch(url, board, this.httpOptions).pipe(
      tap((_) => this.log(`updated board id=`)),
      catchError(this.handleError<any>('updateBoard'))
    );
  }

  /** POST: add a new Microfi report to the server */
  registerMfiReport(report: MfiReport): Observable<MfiReport> {
    const url = `${environment.apiUrl}` + '/mms/mfi/report/register/';
    return this.httpClient.post<MfiReport>(url, report, this.httpOptions).pipe(
      tap(
        (newReport: MfiReport) => this.log(`added mfi reports w/ id`) // =${newReport.id}
      ),
      catchError(this.handleError<MfiReport>('addSMfiReport'))
    );
  }

  /** GET Microfi report from the server */
  getMfiReport(): Observable<MfiReport[]> {
    const url = `${environment.apiUrl}` + '/mms/mfi/report/register/';
    return this.httpClient.get<MfiReport[]>(url).pipe(
      tap((_) => this.log('fetched mfi reports')),
      catchError(this.handleError<MfiReport[]>('getMfiReprts', []))
    );
  }

  /** PATCH: update the Mfi Report on the server */
  updateMfiReport(id: any, report: MfiReport): Observable<any> {
    const url = `${environment.apiUrl}/mms/mfi/report/${id}`;
    return this.httpClient.patch(url, report, this.httpOptions).pipe(
      tap((_) => this.log(`updated report id=`)),
      catchError(this.handleError<any>('updateReport'))
    );
  }


  /** POST: add a new Microfi report to the server */
  sendPredictionReport(prediction: MfiReport): Observable<MfiReport> {
    const url = `${environment.apiUrl}` + '/mms/mfi/predict/';
    return this.httpClient.post<MfiReport>(url, prediction, this.httpOptions).pipe(
      tap(
        (newReport: MfiReport) => this.log(`added mfi Predictions w/ id`)
      ),
      catchError(this.handleError<MfiReport>('addPredict'))
    );
  }

  /** GET Microfi report from the server */
  getPredictionReport(): Observable<MfiReport[]> {
    const url = `${environment.apiUrl}` + '/mms/mfi/predict/';
    return this.httpClient.get<MfiReport[]>(url).pipe(
      tap((_) => this.log('fetched mfi Predict')),
      catchError(this.handleError<MfiReport[]>('getPredict', []))
    );
  }

  /** PATCH: update the Mfi Report on the server */
  updatePredictionReport(id: any, prediction: MfiReport): Observable<any> {
    const url = `${environment.apiUrl}/mms/mfi/predict/${id}`;
    return this.httpClient.patch(url, prediction, this.httpOptions).pipe(
      tap((_) => this.log(`updated Predict id=`)),
      catchError(this.handleError<any>('updatePredict'))
    );
  }

  /** GET Microfi report from the server */
  getTotalMfi(): Observable<any> {
    const url = `${environment.apiUrl}` + '/mms/mfi/total/';
    return this.httpClient.get(url).pipe(
      tap((_) => this.log('fetched mfi total')),
      catchError(this.handleError<any>('getTotalMfi', []))
    );
  }

  /** GET Mfi Type By Their Assets from the server */
  getMfiTypeAssets(): Observable<any> {
    const url = `${environment.apiUrl}` + '/mms/mfi/asset-by/';
    return this.httpClient.get(url).pipe(
      tap((_) => this.log('fetched mfi type by assets')),
      catchError(this.handleError<any>('getMfiAssetType', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
  handleError<T>(operation = 'operation', result?: T): any {
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
