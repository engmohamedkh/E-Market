import { AfterViewInit, Component, Output, QueryList, ViewChildren, EventEmitter, OnInit, OnChanges, SimpleChanges, DoCheck, Input } from '@angular/core';
import { OneProductCartComponent } from '../one-product-cart/one-product-cart.component';
import { OrderService } from '../../Services/order.service';
import { IProduct } from '../../Helpers/Iproduct';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-shop-card',
  standalone: true,
  imports: [OneProductCartComponent],
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.css'
})
export class ShopCardComponent implements OnInit, OnChanges {
  constructor(private orderservice: OrderService, private authservice: AuthService) {
    this.orderservice.order.customerID = this.authservice.userid()
  }
  @Output() myevent = new EventEmitter();
  @ViewChildren(OneProductCartComponent) productComponents!: QueryList<OneProductCartComponent>;
  totalprice: number = 0;
  temp: any = [
    { proname: "pccccccccccccccccccccccccccc1", price: 5000, quantity: 1, QuantityPrice: 5000 },
    { proname: "pccccccccccccccccccccccccc2", price: 15000, quantity: 1, QuantityPrice: 15000 }];

  productsInCart: { prod: IProduct, quantity: number, quantityPrice: number }[] = [];
  @Input() clear: any;

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes["clear"].currentValue === true) {
      console.log("clearrr")
      this.productsInCart.length = 0
      this.orderservice.cartCount = 0;
      this.myevent.emit(0)
      await this.orderservice.updateFieldInOrders('customerID', this.orderservice.order.customerID, 'products', this.productsInCart);
    }
  }
  ngOnInit() {

    this.loadData()
    // console.log(this.orderservice.order.customerID)
  }
  async loadData() {
    try {
      // this.orderservice = new OrderService();
      const order = await this.orderservice.getOrderByField('customerID', this.orderservice.order.customerID);
      if (order.length > 0) {
        for (let p of order.pop()?.products || []) {
          this.productsInCart.push({ prod: p.prod, quantity: p.quantity, quantityPrice: p.prod.price * p.quantity })
        }
      } else {
        console.log('No orders found');
      }
    } catch (error) {
      console.error('Error getting orders:', error);
    }
    this.totalprice = 0
    for (let product of this.productsInCart) {
      this.totalprice += product.quantityPrice
    }
    console.log(this.totalprice)
    this.myevent.emit(this.totalprice)
  }
  ondelete(childID: any) {
    for (let p of this.productsInCart) {
      if (p.prod.id == childID) {
        const index = this.productsInCart.indexOf(p);
        if (index !== -1) {
          this.productsInCart.splice(index, 1);
        }
      }
    }
    this.myevent.emit(0)
    this.calculateTotalPrice();

  }
  calculateTotalPrice() {
    this.totalprice = 0;
    this.productComponents.forEach((productComponent: OneProductCartComponent) => {
      console.log(productComponent.product.prod.name)
      this.totalprice += productComponent.product.quantityPrice;
      this.myevent.emit(this.totalprice)
      console.log(this.totalprice)
    });
  }

  //updare table Orders where productId=id set quantity=newQuantity
  async onChildQuantityChange() {  // { prod: IProduct; quantity: number; quantityPrice: number; }

    this.calculateTotalPrice();
    console.log("quantity changed")
    // console.log(this.newproduct)
    let newproduct: { prod: IProduct, quantity: number }[] = [];
    for (let p of this.productsInCart) {
      newproduct.push({ prod: p.prod, quantity: p.quantity })
    }
    await this.orderservice.updateFieldInOrders('customerID', this.orderservice.order.customerID, 'products', newproduct);
  }
}
