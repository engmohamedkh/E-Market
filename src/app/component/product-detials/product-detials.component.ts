import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CategoryService } from '../../Services/category.service';
import { IProduct } from '../../Helpers/Iproduct';
import { CarouselModule } from 'primeng/carousel';
import { CartComponent } from '../cart/cart.component';
import { OrderService } from '../../Services/order.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../Services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detials',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbCarouselModule,
    MatExpansionModule,
    MatButtonModule,
    SlickCarouselModule,
    CarouselModule,
    CartComponent,
    MatSnackBarModule
  ],
  templateUrl: './product-detials.component.html',
  styleUrl: './product-detials.component.css'
})
export class ProductDetialsComponent implements OnInit, OnDestroy {
  @Input() prod!: IProduct;
  product!: IProduct;
  CategoryProds: IProduct[] = []
  cartquantity: number = 1;
  stock: string = "";
  price: number = 5000;
  // quantity: number = 1;
  responsiveOptions: any[] | undefined;
  slides: any[] = []
  productId: any
  private routeSubscription!: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService
    , private CategoryService: CategoryService,
    private userAuth: AuthService, private orderservice: OrderService, private _snackBar: MatSnackBar) { /*
      this.route.params.subscribe(params => {
        // Access the 'id' parameter
        this.productId = params['id'];
        console.log('Product ID:', this.productId);
      });*/

  }

  order: any;

  async ngOnInit(): Promise<void> {
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
    // Subscribe to changes in route parameters
    this.routeSubscription = this.route.params.subscribe(params => {
      const newProductId = params['id'];
      if (newProductId !== this.productId) {
        // If the product ID has changed, fetch new details
        this.productId = newProductId;
        this.fetchProductDetails();
      }
    });

  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }
  fetchProductDetails() {
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.product = product;


        if (this.product.quantity > 0) {
          this.stock = "In Stock";
        } else {
          this.stock = "Out Stock"
        }

        console.log("Details Page product", this.product);
        this.slides = [
          { img: this.product.imgURL1 },
          { img: this.product.imgURL1 },
          { img: this.product.imgURL1 },
          { img: this.product.imgURL1 },
          { img: this.product.imgURL1 },
          { img: this.product.imgURL1 },


        ];
        this.productService.getProductByCat(this.product.category)
          .subscribe({
            next: (data) => {
              this.CategoryProds = data;
              console.log("Details Page category this.product", data);

            },
            error: () => { console.log("7asal Error ") }
          })

      },
      error: () => { console.log("7asal Error Details Page category products") }
    })

    console.log("product id route", this.route.snapshot.params["id"])

  }
  addItem(product: IProduct) {
    if (this.userAuth.isAuthenticated()) {
      this.orderservice.order.products.length = 0;
      this.orderservice.order.products.push({ prod: product, quantity: this.cartquantity })
      this.orderservice.addOrder(this.orderservice.order);
      console.log(this.orderservice.order)
    } else {
      this.router.navigate(['/login']);
    }

  }

  //#region QUANTITY BUTTONS FUNCTIONS


  plus() {
    if (this.cartquantity <= this.product.quantity - 1) {
      this.cartquantity++;
    }
  }
  minus() {
    if (this.cartquantity > 1) {
      this.cartquantity--;
    }
  }
  // slideConfig = {
  //   "dots": true,
  //   "slidesToShow": window.innerWidth/500,
  //   "slidesToScroll": 1,
  //   "prevArrow":'<button type="button" class="slick-prev" style="background-color: #c4c4c4; height:60px; border-radius:10px;">Previous</button>',
  //   "nextArrow":'<button type="button" class="slick-next" style="background-color: #c4c4c4; height:60px; border-radius:10px;">Previous</button>',
  // };

  addSlide() {
    this.slides.push({ img: this.product.imgURL2 })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  // small:any;
  // medium:any;
  // large:any;

  // @HostListener('window:resize', ['$event1'])
  // onResize(event1: Event) {
  //   this.small = window.innerWidth <= 1000;
  //   this.medium = window.innerWidth > 768;
  //   this.large = window.innerWidth > 1200;

  //   if (this.small) {
  //     this.slideConfig = {
  //       "dots": true,
  //       "slidesToShow": 1,
  //       "slidesToScroll": 1,
  //       "prevArrow":'<button type="button" class="slick-prev" style="background-color: #c4c4c4; height:60px;">Previous</button>',
  //       "nextArrow":'<button type="button" class="slick-next" style="background-color: #c4c4c4; height:60px;">Previous</button>'
  //     };
  //   }
  //   if (this.medium){
  //     this.slideConfig = {
  //       "dots": true,
  //       "slidesToShow": 2,
  //       "slidesToScroll": 1,
  //       "prevArrow":'<button type="button" class="slick-prev" style="background-color: #c4c4c4; height:60px;">Previous</button>',
  //       "nextArrow":'<button type="button" class="slick-next" style="background-color: #c4c4c4; height:60px;">Previous</button>'
  //     };
  //   }
  //   if (this.large){
  //     this.slideConfig = {
  //       "dots": true,
  //       "slidesToShow": 4,
  //       "slidesToScroll": 1,
  //       "prevArrow":'<button type="button" class="slick-prev" style="background-color: #c4c4c4; height:60px;">Previous</button>',
  //       "nextArrow":'<button type="button" class="slick-next" style="background-color: #c4c4c4; height:60px;">Previous</button>'
  //     };
  //   }
  // }

}
