import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import { log } from 'console';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

 
  constructor(
    private authService : AuthService,
  ) {}

  intercept(request: HttpRequest<any>, 
    next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log(request)
        if (request.url.includes('/users')) {
      // Proceed with the request without adding the token
      return next.handle(request);
    }

      const token = this.authService.getToken()
      console.log("token :" , token)

      // SI token à insérer dans le header
      if(token !== null){
        //une copie de la requête originale avec l'ajout d'un en-tête d'authentification.
        let clone = request.clone({
          headers: request.headers.set('Authorization', 'bearer '+token)
        })
        console.log(clone)
        return next.handle(clone)

      }

      
    return next.handle(request);
  }
}
