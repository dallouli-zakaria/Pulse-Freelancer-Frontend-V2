import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {


  let authService = inject(AuthService);
  let routerService = inject(Router);

  if (!authService.isLoggedIn()) {
    routerService.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['roles'];
  return new Promise<boolean>((resolve) => {
    authService.getUserRole().subscribe(
      (role: string) => {
        if (requiredRoles.includes(role)) {
          resolve(true);
        } else {
          routerService.navigate(['/home/pulse']); 
          resolve(false);
        }
      },
      (error) => {
        routerService.navigate(['/login']); 
        resolve(false);
      }
    );
  });
  
};
