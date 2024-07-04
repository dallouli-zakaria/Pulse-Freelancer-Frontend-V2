import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {


  let authservice = inject(AuthService);
  let routerService = inject(Router);

  if (!authservice.isLoggedIn()) {
    routerService.navigate(['/login']);
    return false;
  }
  return true;
};
