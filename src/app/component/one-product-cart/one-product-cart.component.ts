import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../Helpers/Iproduct';
import { OrderService } from '../../Services/order.service';
import { ShopCardComponent } from '../shop-card/shop-card.component';

@Component({
  selector: 'app-one-product-cart',
  standalone: true,
  imports: [CommonModule, ShopCardComponent],
  templateUrl: './one-product-cart.component.html',
  styleUrl: './one-product-cart.component.css'
})
export class OneProductCartComponent {
  constructor(private orderservice: OrderService, private oneproduct: ShopCardComponent) { }
  @Input() product: any
  // { prod: IProduct; quantity: number; quantityPrice: number; }
  // = {
  //   prod: { name: '', price: 0, bestSeller: }, // Replace with your default product values
  //   quantity: 0,
  //   quantityPrice: 0,
  // };
  @Output() quantityChangeEvent = new EventEmitter();
  inc() {
    if (this.product.quantity <= this.product.prod.quantity - 1) {
      this.product.quantity++;
      this.product.quantityPrice = this.product.prod.price * this.product.quantity
      this.quantityChangeEvent.emit();
    }


  }
  dec() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.product.quantityPrice = this.product.prod.price * this.product.quantity
      this.quantityChangeEvent.emit();
    }
  }
  @Output() deletecliked = new EventEmitter();
  async deletefromcart() {
    console.log("delete start")
    this.deletecliked.emit(this.product.prod.id);
    await this.orderservice.deleteProduct(this.product.prod.id)
    console.log("delete end")
  }
}
