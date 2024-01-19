import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../Helpers/Iproduct';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../Services/order.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private router: Router, 
    private orderservice: OrderService, 
    private _snackBar: MatSnackBar,
    private userAuth : AuthService) { }
  ngOnInit(): void {
    this.IsAuth=this.userAuth.isAuthenticated()
  }
IsAuth:boolean=false;
  productdetails() {
    console.log("product detilas id items", this.prod.id, typeof (this.prod.id))
    this.router.navigate(['/Product/' + this.prod.id]);
  }
  @Input() prod!: IProduct;
  @Input() showAddToCart: boolean = true

  addItem(product: IProduct) {
if(this.userAuth.isAuthenticated())
{
  this.orderservice.order.products.length = 0;
  this.orderservice.order.products.push({ prod: product, quantity: 1 })
  this.orderservice.addOrder(this.orderservice.order);
  console.log(this.orderservice.order)
}else 
{
  this.router.navigate(['/login']);
}
   
  }



}
