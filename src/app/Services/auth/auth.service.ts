import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  useremail: string = '';
  userrole: string = '';
  //private isloggedSubject: BehaviorSubject<boolean>;
  constructor(private cookieService: CookieService) {
    //this.isloggedSubject=new BehaviorSubject<boolean> (this.isUserLogged);
  }
  isAuthenticated(): boolean {
    this.useremail = this.cookieService.get('useremail');
    this.userrole = this.cookieService.get('userrole');
    return !!this.useremail && !!this.userrole;
  }
  isAdmin():boolean
  {
    this.useremail = this.cookieService.get('useremail');
    this.userrole = this.cookieService.get('userrole');
    return !!this.useremail && !!this.userrole && this.userrole=='admin';
  }
  userid()
  {
    return(this.cookieService.get('id'))
  }
  LogOut(): void {
    this.cookieService.delete('useremail');
    this.cookieService.delete('userrole');
    this.cookieService.delete('id');

    console.log("success logout")
  }


 /* login(userName: string, password: string)
  {
    // Call login API, and get Access Token
    let usrToken='123456789';
    localStorage.setItem("token", usrToken);
    this.isloggedSubject.next(true);
  }*/



 /* get isUserLogged(): boolean
  {
    return  (localStorage.getItem('token'))? true: false
  }

  //allowing other components/services to 
  //subscribe and receive updates on the authentication status.
  getloggedStatus(): Observable<boolean>
  {
    return this.isloggedSubject.asObservable();
  }*/
}

