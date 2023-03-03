import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService:UsersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentToken = this.userService.getToken();
    console.log(currentToken);
    if(!currentToken){
        return next.handle(request);
    }

    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${currentToken}`)
  });
    return next.handle(modifiedRequest);
  }
}
