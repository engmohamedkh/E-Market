import { Component, AfterViewInit, Renderer2, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../cart/cart.component';
import { CarouselModule } from 'primeng/carousel';
import { IProduct } from '../../Helpers/Iproduct';
import { ICategory } from '../../Helpers/Icategory';
import { ProductsService } from '../../Services/products.service';
import { CategoryService } from '../../Services/category.service';
import { FilteredDataService } from '../../Services/filtered-data.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CardComponent,
    CartComponent,
    SlidebarComponent,
    NgClass,
    MatButtonModule,
    NgbCarouselModule,
    CarouselModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit  {
  products:IProduct[]=[]
  path: string='Smart Phone';
  constructor(private productService : ProductsService,private CategoryService : CategoryService,
    private FilteredDataService:FilteredDataService) {}
  images = [
    "https://firebasestorage.googleapis.com/v0/b/angular-app-e02ea.appspot.com/o/1.jpg?alt=media&token=f9e70c70-d6af-414d-96f7-3542cad1a8c0",
    "https://firebasestorage.googleapis.com/v0/b/angular-app-e02ea.appspot.com/o/2.jpg?alt=media&token=b860ad7b-a5a3-432b-aff5-1799a54792d4",
    "https://firebasestorage.googleapis.com/v0/b/angular-app-e02ea.appspot.com/o/3.jpg?alt=media&token=68fbc9db-b26c-415c-a5e6-60bb9f6ddfdc",
    "https://firebasestorage.googleapis.com/v0/b/angular-app-e02ea.appspot.com/o/5.jpg?alt=media&token=480c02fe-f176-4eeb-a255-3121e5931288"
  ];



  items = [1, 2, 3, 4];
  category:ICategory[]=[]
  filterProducts:IProduct[]=[]
  filterProductsNew:IProduct[]=[]
  filterProductsBestseller:IProduct[]=[]
  filterProductsSale:IProduct[]=[]
  activeCategory: string ='Smart Phone';
  responsiveOptions: any[] | undefined;
  filterProduct(categoryName:string)
  {
    //console.log('here',i.category)
      this.filterProducts=[]
      this.filterProductsBestseller=[]
      this.filterProductsNew=[]
      this.filterProductsSale=[]
    for(let i of this.FilteredDataService.products){
      if(i.category==categoryName)
      {
      this.filterProducts.push(i)
      }
      if(i.bestSeller)
      {
        this.filterProductsBestseller.push(i)
      }
      if(i.prodnew)
      {
        this.filterProductsNew.push(i)
      }
      if(i.prodsale)
      {
        this.filterProductsSale.push(i)
      }
    }
    if(this.FilteredDataService.filterProducts.length==0)
    {
    this.FilteredDataService.filterProducts=this.filterProducts
    this.FilteredDataService.filterProductsBestseller=this.filterProductsBestseller
    this.FilteredDataService.filterProductsNew=this.filterProductsNew
    this.FilteredDataService.filterProductsSale=this.filterProductsSale
    }
  }
  
  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.filterProduct(category)
  }
  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '450px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '375px',
        numVisible: 1,
        numScroll: 1.2
      },
      {
        breakpoint: '320px',
        numVisible: 1,
        numScroll: 1.5
      }
    ];
    if(this.FilteredDataService.filterProducts.length==0)
    {
      this.CategoryService.getAllCategories()
      .subscribe({
        next: (Cats) => {
          this.category=Cats
          console.log('cat0',this.category)
        },
        error: () => { console.log("7asal Error") }
      })
    this.productService.getAllProducts()
    .subscribe({
      next: (product) => {
        console.log('product',product)
        this.products = product;
        this.FilteredDataService.products=this.products
        if(this.category[0].name){
          this.filterProduct(this.category[0].name)
            console.log('cat1',this.category[0].name)
            console.log('cat2',this.filterProducts)
          }
        
      },
      error: (err) => {} //console.log("error:", err) }
    })

  }
  else
  {
    this.filterProducts=this.FilteredDataService.filterProducts
    this.filterProductsBestseller=this.FilteredDataService.filterProductsBestseller
    this.filterProductsNew=this.FilteredDataService.filterProductsNew
    this.filterProductsSale=this.FilteredDataService.filterProductsSale
    this.CategoryService.getAllCategories()
    .subscribe({
      next: (Cats) => {
        this.category=Cats
        console.log('cat',this.category)
      },
      error: () => { console.log("7asal Error") }
    })
  }
}
}
