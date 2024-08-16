import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partenaire } from 'app/models/partenaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
  private apiUrl = 'http://localhost:8085/partners';

  constructor(private http: HttpClient) { }

  getAllPartner():Observable<Partenaire[]>
  {
    return this.http.get<Partenaire[]>(this.apiUrl);
  }

  deletePartner(id:any): Observable<any>{
    return this.http.delete<any>(this.apiUrl+'/' +id);
  }
  
  getByIdPartner(id:number): Observable<any> {
    return this.http. get<any>(this.apiUrl+'/' + id);
  }

  

  createPartner (partenaire:Partenaire): Observable<Partenaire>{
    return this.http.post<Partenaire>(this.apiUrl,partenaire,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updatePartner(  id : number ,partenaire:  Partenaire): Observable< Partenaire> {
    return this.http.put<Partenaire>(this.apiUrl+'/' + id, partenaire, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
