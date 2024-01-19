import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';

export const logInGuard: CanActivateFn = () : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>=> {
  if(!inject(AuthService).isAuthenticated())
  {
   inject(Router).navigate(['/login']);
   return false
  }
  else
  {
   return true
  }
 };