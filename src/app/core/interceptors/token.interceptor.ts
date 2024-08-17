import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  

  const authService = inject(AuthService);



  return next(req);
};
