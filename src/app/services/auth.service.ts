import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private tokenUrl = "http://localhost:8080/realms/spring-micro-main/protocol/openid-connect/token";
      private userUrl = "http://localhost:8085/users"

  constructor(
    private http: HttpClient

  ) { }

  

  getToken(): string {
    return localStorage.getItem('accessToken')
  }


   //stocker le token dans local storage
   storeToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }


  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `grant_type=password&client_id=spring-micro-gateway&client_secret=r4EsUp1M8iHFvEOg1Da5MZ6RgaLdlzKZ&username=${username}&password=${password}`;

    return this.http.post(this.tokenUrl, body, { headers });
  }
 
  createUser( user: any): Observable<any> {
   const token = localStorage.getItem('accessToken'); // Récupérer le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization

      
    });

    return this.http.post(this.userUrl, user, { headers });
  }}

  
