import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-card-summary',
  standalone: true,
  
  imports: [],
  templateUrl: './shop-card-summary.component.html',
  styleUrl: './shop-card-summary.component.css'
})
export class ShopCardSummaryComponent {
  constructor(private _snackBar: MatSnackBar){}
total() {
  this._snackBar.open("Your Total order Price is " + this.totPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })+"$", "Ok");


}

  @Input() totPrice: any;
  @Output() clearclicked: any = new EventEmitter();
  clear() {
    console.log("clear clecked")
    this.clearclicked.emit()
  }
}


