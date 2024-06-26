import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContactById(id:any): Observable<any> {
    return this.http.get(AppConstants.API_URL+`contacts/contact/${id}`, httpOptions);
  }

  getAllContacts(): Observable<any> {
    return this.http.get(AppConstants.API_URL+"contacts/All", httpOptions);
  }

  addContact(Contact :any): Observable<any> {
    return this.http.post(AppConstants.API_URL+"contacts/addContact",Contact, httpOptions);
  }

  editContact(Contact :any): Observable<any> {
    return this.http.put(AppConstants.API_URL+"contacts/editContact",Contact, httpOptions);
  }

  deleteContact(id:any): Observable<any> {
    return this.http.delete(AppConstants.API_URL+`contacts/deleteContact/${id}`, httpOptions);
  }
}
