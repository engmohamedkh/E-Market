import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  nameReq=""

  myRegForm = new FormGroup({
    name:new FormControl(null,Validators.required),
    email:new FormControl(null,Validators.required),
    phone:new FormControl(null,Validators.required),
    comment:new FormControl(null,Validators.required),
  })


  GetData(){
    if(this.myRegForm.valid){
     
      console.log("Name Valid: ",this.myRegForm.controls.name.value);
      console.log("Age Valid: ",this.myRegForm.controls.email.value);
      this.myRegForm.reset({
        name: null,
        email: null, // Set the default email value to 'gmail'
        phone: null,
        comment: null
      });
    }
return this.myRegForm.value
  }
}
