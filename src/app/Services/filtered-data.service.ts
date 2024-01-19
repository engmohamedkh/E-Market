import { Injectable } from '@angular/core';
import { IProduct } from '../Helpers/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class FilteredDataService {
  products:IProduct[]=[]
  filterProducts:IProduct[]=[]
  filterProductsNew:IProduct[]=[]
  filterProductsBestseller:IProduct[]=[]
  filterProductsSale:IProduct[]=[]
  constructor() { }
}