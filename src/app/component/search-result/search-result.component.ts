
import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../cart/cart.component';
import { ProductsService } from '../../Services/products.service';
import { ICategory } from '../../Helpers/Icategory';
import { CategoryService } from '../../Services/category.service';
import { IProduct } from '../../Helpers/Iproduct';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatBadgeModule,
    MatIconModule,
    NgbPaginationModule,
    NgbDropdownModule,
    MatSnackBarModule,
    CartComponent
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit, OnChanges{

  searchTerm: string = '';
  selectedCategory: string = 'all';
  prdList: IProduct[] = [];
  prdListtemp: IProduct[] = [];
  temp: IProduct[] = [];
  prdListtemp2: IProduct[] = [];
  prdListforcatname: IProduct[] = [];
  prdListorg: IProduct[] = []; 
  prdListorg2: IProduct[] = []; 
  catlist:ICategory[]=[];

  constructor(private _snackBar: MatSnackBar,
    private myService: ProductsService, private router: Router,
    private route:ActivatedRoute,
    private CategoryService : CategoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.selectedCategory=params['selectedCategory'];
       this.SearchResultProducts();
    });
   
    //this.GetAllProducts();
    //this.GetAllGategories();
    

  }
 private max : any;
 SearchResultProducts(){
  this.myService.getAllProducts()
  .pipe(
    map(products => products.filter((product: IProduct) => {
      const productName = (product.name || '').toLowerCase();
      return productName.includes(this.searchTerm.toLowerCase());
    })))
  .subscribe({
    next: (filteredProducts) => {
      // filteredProducts will only contain products with the specified name
        if(this.selectedCategory=='all')
        {
          this.prdList = filteredProducts;
          this.prdListorg=filteredProducts
          this.max = this.prdListorg.length;
          this.collectionSize = this.prdList.length
        }else{
          const searchresult=filteredProducts.filter(product => product.category === (this.selectedCategory));
          this.prdList = searchresult;
          this.prdListorg=searchresult
          this.max = this.prdListorg.length;
          this.collectionSize = this.prdList.length
        }
     

    },
    error: (error) => {
      // Handle error
    }
  });
 }
  GetAllProducts() {
    this.myService.getAllProducts()
      .subscribe({
        next: (products) => {

          this.prdList = products;
          this.prdListorg=products
         this.max = this.prdListorg.length;
          console.log(this.prdListorg2)
          this.collectionSize = this.prdList.length
    
    
        },
        error: () => { console.log("7asal Error") }
        
      })
    }
    GetAllGategories(){
      this.CategoryService.getAllCategories()
      .subscribe({
        next: (Cats) => {
          console.log(Cats)
          this.catlist=Cats

        },
        error: () => { console.log("7asal Error") }
      })
    }
  
      
    
  //BADGE
  icons:any=0;
  addItem() {
    this.icons+=1;
    this._snackBar.open("You added an Item To Your Cart", "Ok");
  }

  
  //SLIDER FUNCTIONS
  formatLabel(value: number): string {
    return `${value}$`;
  }


  //PAGINATOR FUNCTIONS
  items:any[]=[
    {src: "../../assets/images/1.jpg"},
    {src: "../../assets/images/2.jpg"},
    {src: "../../assets/images/3.jpg"},
    {src: "../../assets/images/4.jpg"},
    {src: "../../assets/images/5.jpg"},
    {src: "../../assets/images/1.jpg"},
    {src: "../../assets/images/2.jpg"},
    {src: "../../assets/images/3.jpg"},
    {src: "../../assets/images/4.jpg"},
    {src: "../../assets/images/5.jpg"},
    {src: "../../assets/images/1.jpg"},
    {src: "../../assets/images/2.jpg"},
    {src: "../../assets/images/3.jpg"},
    {src: "../../assets/images/4.jpg"},
    {src: "../../assets/images/5.jpg"},
    {src: "../../assets/images/1.jpg"},
    {src: "../../assets/images/2.jpg"},
    {src: "../../assets/images/3.jpg"},
    {src: "../../assets/images/4.jpg"},
    {src: "../../assets/images/5.jpg"},
    {src: "../../assets/images/1.jpg"},
    {src: "../../assets/images/2.jpg"},
    {src: "../../assets/images/3.jpg"},
    {src: "../../assets/images/4.jpg"},
    {src: "../../assets/images/5.jpg"},
    {src: "../../assets/images/1.jpg"},
    {src: "../../assets/images/2.jpg"},
    {src: "../../assets/images/3.jpg"},
    {src: "../../assets/images/4.jpg"},
    {src: "../../assets/images/5.jpg"},
  ]

  displayedItems = [...this.items];

  //collectionSize:number=this.prdList.length;
  collectionSize:number=40

  page:number=1;
  pageSize:number=9;

  onPageChange() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
  

 //FILTERATION XXXXXXXXXXXXXXXX

 minPrice: number = 400;
 maxPrice: number = 12000;
 selectedOption: string = ''; // Variable to store the selected option
 
 
 selectOption(option: string) {
  this.selectedOption = option;
  console.log('Selected Option:', this.selectedOption);
  this.prdList=this.sortProducts(this.prdList,this.selectedOption);
}
  
  
 sortProducts(products: IProduct[],sortOrder: string,): IProduct[] {
   //const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
   const sortedProducts = [...products]; // Create a copy of the filtered array
   switch (sortOrder) {
     case 'lowToHigh':
       sortedProducts.sort((a, b) => a.price - b.price);
       break;
 
     case 'highToLow':
       sortedProducts.sort((a, b) => b.price - a.price);
       break;
       case 'default':
         sortedProducts;
         break;
     default:
       sortedProducts;    }
 
   return sortedProducts;
   //return sortedProducts;
 }
 sortProductsInRange(products: IProduct[], minPrice: number, maxPrice: number): IProduct[] {
   const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
   const sortedProducts = [...filteredProducts]; // Create a copy of the filtered array
  
   return sortedProducts;
 }

 applyFilter() {
  //this.GetAllProducts()
   this.displayedItems=this.prdList.slice(0,2)
   this.collectionSize=this.displayedItems.length;
   window.scrollTo({
     top: 0,
     behavior: 'instant'
   });


  this.prdListtemp=this.sortProductsInRange(this.prdList,this.minPrice,this.maxPrice)
 this.prdList=this.prdListtemp;

 }

 resetFilter() {
 
   this.displayedItems=this.items
   this.collectionSize=this.displayedItems.length;
   window.scrollTo({
     top: 0,
     behavior: 'instant'
   });



   this.selectedBrands= {
  "Lenovo": false ,
  "Samsung" : false,
  "Apple" : false,
  "HUAWEI" : false
 };
 this.selectedcats= {
  "Smart Phone": false ,
  "Laptop" : false,
  "Tablet" : false,
  "TV Screen" : false,
  "Smart Watch" : false
 };
 this.prdList=this.prdListorg
 }






 /************            brand filter                          **************/
  brands: string[] = ['Lenovo', 'Samsung', 'Apple', 'HUAWEI'];
  selectedBrands: { [brand: string]: boolean } = {
    "Lenovo": false,
    "Samsung": false,
    "Apple": false,
    "HUAWEI": false
  };
  cats: string[] = ['Smart Phone', 'Laptop', 'Tablet', 'TV Screen', 'Smart Watch'];
  selectedcats: { [cats: string]: boolean } = {
    "Smart Phone": false,
    "Laptop": false,
    "Tablet": false,
    "TV Screen": false,
    "Smart Watch": false
  };
  filteredProducts: IProduct[] = [];
  toggleBrand(brand: string): void {
    this.selectedBrands[brand] = !this.selectedBrands[brand];

    const selectedBrandsArray = Object.keys(this.selectedBrands).filter(
      (key) => this.selectedBrands[key]
    );
    console.log("selected brands", selectedBrandsArray)

  }
  onCheckboxClick(brand: string) {
    console.log("selected brand", brand)
    console.log("products", this.prdList)
    this.filterProducts();

    this.prdList = this.prdListorg


    this.prdList = this.filteredProducts

    console.log("selected brands", this.selectedBrands)
    console.log("products before filter", this.filteredProducts)
  }
  filterProducts(): void {

    /* this.filteredProducts = this.prdListorg.filter((product) => {
       return this.selectedBrands[product.brand] || this.selectedcats[product.category];
     })*/
    if (this.hasSelectedBrands() && this.hasSelectedCategories()) {
      // If both brands and categories are selected, get the intersection
      this.filteredProducts = this.prdListorg.filter((product) => {
        return this.selectedBrands[product.brand] && this.selectedcats[product.category];
      });
      if (this.filteredProducts.length === 0) {
        this.filteredProducts = [];
        console.log('No products match both selected brands and categories.');
      }
    } else if (this.hasSelectedBrands()) {
      // If only brands are selected, filter based on brands
      this.filteredProducts = this.prdListorg.filter((product) => {
        return this.selectedBrands[product.brand];
      });
    } else if (this.hasSelectedCategories()) {
      // If only categories are selected, filter based on categories
      this.filteredProducts = this.prdListorg.filter((product) => {
        return this.selectedcats[product.category];
      });
    } else {
      // If neither brands nor categories are selected, show all products
      this.filteredProducts = [...this.prdListorg];
    }
  }
  private hasSelectedBrands(): boolean {
    return Object.values(this.selectedBrands).some(value => value);
  }

  private hasSelectedCategories(): boolean {
    return Object.values(this.selectedcats).some(value => value);
  }
}



