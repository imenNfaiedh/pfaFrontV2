import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convention } from 'app/models/convention';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private apiUrl = 'http://localhost:8085/conventions';

  constructor(private http: HttpClient) { }

  getConventionsByPartenaireId(id: number): Observable<Convention[]> {
    return this.http. get<any>(this.apiUrl+'/' + id);  }

  getAllConvention():Observable<Convention[]>
  {
    return this.http.get<Convention[]>(this.apiUrl);
  }

  getByIdConvention(id:number): Observable<any> {
    return this.http. get<any>(this.apiUrl+'/' + id);
  }
  createConvention (convention:Convention): Observable<Convention>{
    return this.http.post<Convention>(this.apiUrl,convention,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

 
}
