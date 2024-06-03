import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { ITypePercentage } from '../interface/count.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  getUserContrats(id:any): Observable<any> {
    return this.http.get(AppConstants.CONTRAT_URL+`Mycontrat/${id}`, httpOptions);
  }

  getContratById(id:any): Observable<any> {
    return this.http.get(AppConstants.CONTRAT_URL+`${id}`, httpOptions);
  }

  getAllContrats(): Observable<any> {
    return this.http.get(AppConstants.CONTRAT_URL+"listeContrats", httpOptions);
  }

  getTypePercentage(): Observable<Array<ITypePercentage>> {
    return this.http
      .get<Array<ITypePercentage>>(AppConstants.CONTRAT_URL+"PercentageByBranche", httpOptions)
      .pipe(map((d: Array<ITypePercentage>) => d));
  }

  
  getContratByProduit(): Observable<any> {
    return this.http.get(AppConstants.CONTRAT_URL+"countByProduit", httpOptions);
  }

  createPaymentSession(contratId: number): Observable<string> {
    return this.http.post<string>(AppConstants.CONTRAT_URL + `pay/${contratId}`, {}, { responseType: 'text' as 'json' });
  }
}
