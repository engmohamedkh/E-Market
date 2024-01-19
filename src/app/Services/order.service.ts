import { Injectable, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, query, updateDoc, where, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Iorder } from '../Helpers/Iorder';
import { WriteBatch, and, or, writeBatch } from 'firebase/firestore';
import { IProduct } from '../Helpers/Iproduct';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore, private authservice: AuthService, private _snackBar: MatSnackBar) {
  }
  order: Iorder = {
    orderDate: new Date(),
    orderAddress: "",
    orderID: 0,
    customerID: this.authservice.userid(),
    Opened: true,
    products: []
  };
  ordersCollection: any = collection(this.firestore, 'Orders');

  cartCount: any = 0;
  async CartCount() {
    console.log(this.cartCount)
    try {
      const order = await this.getOrderByField('customerID', this.order.customerID);
      if (order.length > 0) {
        this.cartCount = order.pop()?.products.length
        console.log(this.order.customerID)
        console.log(this.cartCount)
      } else {
        console.log('No orders found');
      }
    } catch (error) {
      console.error('Error getting orders:', error);
    }
  }


  // Function to search for a docu ment by a specific field
  //select * from Orders where customerID=ID
  getOrderByField(fieldName: string, value: any): Promise<Iorder[]> {
    const q = query(this.ordersCollection, where(fieldName, '==', value));

    return getDocs(q).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data() as Iorder);
    });
  }

  // Function to update for a document by a specific field
  // upate table Orders where customerId=id set product = newproduct
  async updateFieldInOrders(fieldName: string, value: any, fieldToUpdate: string, newValue: any): Promise<void> {
    const q = query(this.ordersCollection, where(fieldName, '==', value));

    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map(async (orderDoc) => {
      const orderRef = doc(this.ordersCollection, orderDoc.id);
      await updateDoc(orderRef, { [fieldToUpdate]: newValue });
    });
    await Promise.all(updatePromises);
  }
  async deleteProduct(productId: number): Promise<void> {
    try {
      console.log("geting data start")
      const order = await this.getOrderByField('customerID', this.order.customerID);
      console.log("geting data end")
      if (order.length > 0) {
        try {
          // order.pop()?.products

          const updatedProducts = order.pop()?.products.filter(
            (product) => product.prod.id !== productId
          );
          console.log("updating data start")
          // this.updateCartCount(-1)
          this.cartCount--;
          await this.updateFieldInOrders('customerID', this.order.customerID, 'products', updatedProducts);///latency not here
          console.log("updating data end")
          console.log('product deleted successfully');
        } catch (error) {
          console.error('Error deleting product:', error);
        }
        // console.log('Orders found:', order);
      } else {
        console.log('No orders found');
      }
    } catch (error) {
      console.error('Error getting orders:', error);
    }
  }




  //////if customer already has order (same custid)==> update order,, if new customer ==>new order
  async addOrder(order1: Iorder) {
    try {
      const orders = await this.getOrderByField('customerID', this.order.customerID);
      if (orders.length > 0) {//==1
        // order1.products//new
        // orders.pop()?.products//old
        try {
          let tempSet = new Set<number>();
          let tempArray: { prod: IProduct, quantity: number }[] = [];

          let poppedProducts = orders.pop()?.products || [];
          for (let prod of poppedProducts) {
            if (!tempSet.has(prod.prod.id)) {
              tempSet.add(prod.prod.id);
              tempArray.push(prod);
            }
            else {
              console.log("already added")
              this._snackBar.open("The item has already been added to your cart", "Ok");
            }
          }
          for (let prod of order1.products) {
            if (!tempSet.has(prod.prod.id)) {
              tempSet.add(prod.prod.id);
              tempArray.push(prod);
              // this.updateCartCount(1)
              this.cartCount++;
              this._snackBar.open("You added a new Item To Your Cart", "Ok");
            }
            else {
              console.log("already added")
              this._snackBar.open("The item has already been added to your cart", "Ok");
            }
          }

          await this.updateFieldInOrders('customerID', this.order.customerID, 'products', tempArray);
          console.log('Orders updated successfully');
        } catch (error) {
          console.error('Error updating orders:', error);
        }
      } else {
        console.log('No orders found');
        console.log('New Order created');
        addDoc(this.ordersCollection, order1);
      }
    } catch (error) {
      console.error('Error getting orders:', error);
    }
  }

}

