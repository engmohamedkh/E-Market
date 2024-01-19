import { Component, OnInit,NgZone } from '@angular/core';
import {FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs'
import { userService } from '../../Services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  passworderror:boolean=false
  emailerror:boolean=false
  nameerror:boolean=false
  ageerror:boolean=false
  confirmpassworderror:boolean=false
  saltRounds = 10;
  password:string=''
  confirmPassword:string=''
  user:any
  existUser:boolean=false
  hashedpassword:string=''
  userisexist:boolean=false
  intervalId: any;
  constructor(private userService : userService,private ngZone: NgZone, private router: Router,)
  {

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((userData) => {
    this.user=userData
    console.log('userData',this.user)
    this.ngZone.runOutsideAngular(() => {
      this.startTimer();
    });
})
  }
  confirmPasswordBool:boolean=false
  myRegForm = new FormGroup({
    name:new FormControl(null,[Validators.required, Validators.pattern('[A-Z a-z]{3,}')]),
    age:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required]),
    password:new FormControl(null, [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    confirmPassword: new FormControl(null,[Validators.required]),
  })
  get NameValid(){
    return this.myRegForm.controls.name.valid
  }
  get AgeValid(){
    return this.myRegForm.controls.age.valid
  }
  get EmailValid(){
    return this.myRegForm.controls.email.valid
  }
  get PasswordValid(){
    return this.myRegForm.controls.password.valid
  }
  get ConfirmPasswordValid(){
    return this.myRegForm.controls.confirmPassword.valid
  }
  
   isexist()
  {
    this.existUser=false
    if(this.myRegForm.valid)
    {
      if(this.user)
      {
        for(let i of this.user)
        {
          if(i.email==String(this.myRegForm.value.email))
          {
            this.emailerror=true
            this.existUser=true
          }
        }
      }
    }
    else
    {
      if(this.myRegForm.controls.name.invalid)
      {
      this.nameerror=true
      }
      else if(this.myRegForm.controls.age.invalid)
      {
      this.ageerror=true
      }
      else if(this.myRegForm.controls.email.invalid)
      {
      this.emailerror=true
      }
      else if(this.myRegForm.controls.password.invalid)
      {
      this.passworderror=true
      }
      else if(this.myRegForm.controls.confirmPassword.invalid)
      {
      this.confirmpassworderror=true
      }
    }
}
chenge()
{
  if (this.myRegForm.controls.email.valid && this.myRegForm.controls.email.touched) {
    this.emailerror=false
  }
  if (this.myRegForm.controls.password.valid && this.myRegForm.controls.password.touched) {
    this.passworderror=false
  }
  if(this.myRegForm.controls.age.valid && this.myRegForm.controls.age.touched)
  {
    this.ageerror=false
  }
  if(this.myRegForm.controls.name.valid && this.myRegForm.controls.name.touched)
  {
    this.nameerror=false
  }
  if(this.myRegForm.controls.confirmPassword.valid && this.myRegForm.controls.confirmPassword.touched)
  {
    this.confirmpassworderror=false
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
    this.isexist()
    console.log(this.existUser)
      if(this.myRegForm.valid)
       {
            if (!this.existUser) {
              this.password = String(this.myRegForm.value.password);
              this.confirmPassword = String(this.myRegForm.value.confirmPassword);
              if (this.password != this.confirmPassword) {
                this.confirmpassworderror=true
                this.confirmPasswordBool = true;
              }
              else {
                bcrypt.hash(this.password, this.saltRounds, (err, hash) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Encrypted Password:', hash);
                    this.hashedpassword = hash;
                    this.user = { name: this.myRegForm.value.name, age: this.myRegForm.value.age, email: this.myRegForm.value.email, password: this.hashedpassword,role:'user' };
                    console.log(this.user);
                    this.userService.AddUser(this.user).then(
                      (res) => {
                        this.router.navigate(['/login']);
                      }
                    );
                  }
                });
              }
            }
}
}
}
