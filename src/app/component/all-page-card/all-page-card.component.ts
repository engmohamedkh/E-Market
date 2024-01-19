import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ShopCardComponent } from '../shop-card/shop-card.component';
import { ShopCardSummaryComponent } from '../shop-card-summary/shop-card-summary.component';

@Component({
  selector: 'app-all-page-card',
  standalone: true,
  imports: [ShopCardComponent, ShopCardSummaryComponent],
  templateUrl: './all-page-card.component.html',
  styleUrl: './all-page-card.component.css'
})
export class AllPageCardComponent {
  constructor(private cdRef: ChangeDetectorRef) { }

  totalPrice: any;
  temp: any
  gettotalprice(data: any) {
    this.totalPrice = data;
    this.cdRef.detectChanges();
  }

  clear: boolean = false;
  onclear() {
    this.clear = true;
    console.log("clear")
  }
}
