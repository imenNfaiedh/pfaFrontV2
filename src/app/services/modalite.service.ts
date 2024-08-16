import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modalite } from 'app/models/modalite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModaliteService {

  private apiUrl = 'http://localhost:8085/modalite';

  constructor( private http: HttpClient) { }

  getAllModalite():Observable<Modalite[]>
  {
    return this.http.get<Modalite[]>(this.apiUrl);
  }

  deletemodalite(id:any): Observable<any>{
    return this.http.delete<any>(this.apiUrl+'/' +id);
  }
  getByIdModalite(id:number): Observable<any> {
    return this.http. get<any>(this.apiUrl+'/' + id);
  }

  

  createModalite (modalite:Modalite): Observable<Modalite>{
    return this.http.post<Modalite>(this.apiUrl,modalite,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateModalite(  id : number ,modalite:  Modalite): Observable< Modalite> {
    return this.http.put<Modalite>(this.apiUrl+'/' + id, modalite, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
