import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service'
import { url } from 'inspector';

/*export class userGuard implements AuthService {
  route:any
  userrole: string ='';
  isAuthenticated(): boolean {
    return false
  }
  useremail: string='';
  authenticated(): boolean {
    return false;
  }
}*/

export const adminGuard: CanActivateFn = () : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>=> {
 if(!inject(AuthService).isAdmin())
 {
  inject(Router).navigate(['/home']);
  return false
 }
 else
 {
  return true
 }
};
