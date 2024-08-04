import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  

  const authService = inject(AuthService);

  // Function to add the token to the request
  // const addToken = (request: HttpRequest<any>, token: string) => {
  //   return request.clone({
  //     setHeaders: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
  // };

  // Add token to the request if available
  // if (authService.getJwtToken()) {
  //   req = addToken(req, authService.getJwtToken());
  // }

  // Handle the request
//   return next(req).pipe(
//     catchError((error) => {
//       if (error instanceof HttpErrorResponse && error.status === 401) {
//         return handle401Error(req, next, authService);
//       }
//       return throwError(() => error);
//     })
//   );
// };

// Function to handle 401 errors
// const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) => {
//   return authService.refreshToken().pipe(
//     switchMap((tokens: any) => {
//       return next(addToken(request, tokens.access_token));
//     }),
//     catchError((refreshError) => {
//       // If refresh fails, log out the user
//       authService.logout();
//       return throwError(() => refreshError);
//     })
//   );
// };

// Helper function to add token to request
// const addToken = (request: HttpRequest<any>, token: string) => {
//   return request.clone({
//     setHeaders: {
//       'Authorization': `Bearer ${token}`
//     }
//   });

  return next(req);
};
