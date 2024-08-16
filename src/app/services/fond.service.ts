import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fond } from 'app/models/fond';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FondService {

  private apiUrl = 'http://localhost:8085/fonds';


  constructor(private http: HttpClient) { }



  getAllFond(): Observable<Fond[]> {
    return this.http.get<Fond[]>(this.apiUrl);
  }

  

  createFond(fond: Fond): Observable<Fond> {
    return this.http.post<Fond>(this.apiUrl, fond, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateFond(  id : number ,fond:  Fond): Observable< Fond> {
    return this.http.put<Fond>(this.apiUrl+'/' + id, fond, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getByIdFond(id:number): Observable<any> {
    return this.http. get<any>(this.apiUrl+'/' + id);
  }

  deleteFond(id:any): Observable<any[]> {
    return this.http.delete<any>(this.apiUrl+'/' + id);

  }
}
