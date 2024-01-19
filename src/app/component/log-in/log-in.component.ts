import { Component, OnDestroy, OnInit,NgZone } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { CookieService } from 'ngx-cookie-service';
import { userService } from '../../Services/user.service';
import { Iuser } from '../../Helpers/Iuser';
import { OrderService } from '../../Services/order.service';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit,OnDestroy {
  intervalId: any;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService : userService,
    private orderservice: OrderService,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((userData) => {
    this.user=userData
    console.log('userData',this.user)
    this.ngZone.runOutsideAngular(() => {
      this.startTimer();
    });
})
  }
  emailNotFound:boolean=true
  passworderror:boolean=false
  emailerror:boolean=false
  user:Iuser[]=[]
  role:string=''
  id:string=''
  hashedPasswordFromDatabase:string=''
  userProvidedPassword:string=''
  notValidLogin:boolean=false
  myRegForm = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password:new FormControl(null, [Validators.required]),
  })
  get EmailValid(){
    return this.myRegForm.controls.email.valid
  }
  get PasswordValid(){
    return this.myRegForm.controls.password.valid
  }
  chenge()
  {
    if (this.myRegForm.controls.email.valid && this.myRegForm.controls.email.touched) {
      this.emailerror=false
    }
    if (this.myRegForm.controls.password.valid && this.myRegForm.controls.password.touched) {
      this.passworderror=false
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  startTimer() {
    this.intervalId = setInterval(() => {
      this.ngZone.run(() => this.chenge());
    }, 500);
  }
  check()
  {
    
    if(this.myRegForm.valid)
    {
      this.userProvidedPassword=String(this.myRegForm.value.password)
      for (let i of this.user){

      if(i.email==String(this.myRegForm.value.email))
      {
        this.hashedPasswordFromDatabase=i.password
        this.emailNotFound=false
        this.role=i.role
        this.id=i.id
      }
      }
      if(this.emailNotFound)
      {
        this.emailerror=true
        return
      }
      console.log(this.hashedPasswordFromDatabase)
      bcrypt.compare(this.userProvidedPassword, this.hashedPasswordFromDatabase, async (err, result) => {
        if (err) {
            console.error(err);
        } else {
            if (result) {
                console.log('Password is correct!');
                this.cookieService.set('id',this.id)
                this.cookieService.set('useremail', this.myRegForm.value.email ? this.myRegForm.value.email : '');
                this.cookieService.set('userrole',this.role);
                this.orderservice.order.customerID = this.cookieService.get('id')
                await this.orderservice.CartCount();
                this.router.navigate(['/home']);
            } else {
                console.log('Password is incorrect!');
                this.passworderror=true
                this.notValidLogin=true
            }
          }
        })
    }
    else
    {
      if (this.myRegForm.controls.email.invalid) {
        this.emailerror=true
      }
      else if (this.myRegForm.controls.password.invalid) {
        this.passworderror=true
      }
    }
  }
}