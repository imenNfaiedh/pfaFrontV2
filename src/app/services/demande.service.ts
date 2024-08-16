import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from 'app/models/demande';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:8085/demandes';


  constructor(private http: HttpClient) { }


  getAllDemande(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl);
  }

  
  createDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
