import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../Helpers/Icategory';
import { CategoryService } from '../../Services/category.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../Helpers/Iproduct';
import { ProductsService } from '../../Services/products.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderService } from '../../Services/order.service';


@Component({
  selector: 'app-mid-nav',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,MatAutocompleteModule,MatInputModule,MatFormFieldModule
  ],
  templateUrl: './mid-nav.component.html',
  styleUrl: './mid-nav.component.css'
})

export class MidNavComponent implements OnInit {



  constructor(private CategoryService: CategoryService,
    private myService: ProductsService, private router: Router,
    public orderservice: OrderService) { }
  searchTerm: string = '';
  dropdownValues: ICategory[] = [];
  selectedValue: string = 'all';
  selectedCategory: string = 'all';
  prdList: IProduct[] = [];
  prdListorg: IProduct[] = [];
  prdListsearch: IProduct[] = [];
  searchResults: IProduct[] = [];
  cartitems: any=0 
  firsttime:boolean=true
  async ngOnInit(): 
    Promise<void> {

      await this.orderservice.CartCount()
  
    this.myService.getAllProducts()
      .subscribe({
        next: (products) => {

          this.prdList = products;
          this.prdListorg = products;
          this.prdListsearch= products;

        },
        error: () => { console.log("7asal Error") }
      })
    this.CategoryService.getAllCategories()
      .subscribe({
        next: (Cats) => {

          console.log(Cats)
          this.dropdownValues = Cats;
        },
        error: () => { console.log("7asal Error") }
      })
  }

  onSelectionChange(ev: any) {
    this.firsttime=false
    this.selectedValue = ev.target.value;
  }

  get isSearch() {
    return this.searchTerm != '' ? true : false;
  }
   searchResultCache: IProduct[] = [];
  onSearchChange() {
    if (this.searchTerm !== '') {
      if (this.selectedValue === 'all') {
        this.searchResultCache= this.prdListorg.filter((product: IProduct) => {
          const productName = (product.name || '').toLowerCase();
          return productName.includes(this.searchTerm.toLowerCase());
        });
        console.log('search result are ', this.searchResultCache);
      } else {
        this.searchResultCache= this.prdList
          .filter(product => product.category.includes(this.selectedValue))
          .filter((product: IProduct) => {
            const productName = (product.name || '').toLowerCase();
            return productName.includes(this.searchTerm.toLowerCase());
          });
          console.log('search result are ', this.searchResultCache);
      }
    } 

  
  }

  onSelectResult(prod: IProduct) {
   
    this.router.navigate(['/Product', prod.id],{ skipLocationChange: true });
    console.log('Search term:', prod.id);
    console.log('Search term:', prod.name);
    console.log('Selected category:', prod.category);  
    this.searchTerm=''
    }
 
  
  /*get searchResult(): IProduct[] {
    if (this.searchResultCache.length === 0) {
      this.searchResultCache = this.onSearchChange();
      console.log('search result are ', this.searchResultCache);
    }
    return this.searchResultCache;
  }
*/
  onSearch(): void {
    // Handle the search logic here (e.g., navigate to a search results page)
    //this.router.navigate(['/Product/' + this.selected.id]);
    const productName = 'mmohamed';
    this.router.navigate(['/search'], { queryParams: { searchTerm: this.searchTerm,selectedCategory: this.selectedCategory } });
    console.log('Search term:', this.searchTerm);
    console.log('Selected category:', this.selectedCategory);
  }

  // Ali

  panelWidth: string = '100px';
}




