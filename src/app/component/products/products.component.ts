import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IProduct } from '../../Helpers/Iproduct';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../Services/products.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule],
  providers: [ProductsService],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit, OnChanges {
  prdList: IProduct[] = [];
  // prdListOfCat: any;
  sentCat: string = '';
  searchTerm: string = '';
constructor(private myService: ProductsService, private router: Router) {}


 updateBestSeller(obj:any) {
  this.myService.updateProduct(obj.id ,{bestSeller:obj.best}).then(
    (res) => {
      console.log('Product updated:',obj.id );

           },
   );


}
updateNewProd(obj:any) {
  this.myService.updateProduct(obj.id ,{prodnew:obj.newprod}).then(
    (res) => {
      console.log('Product updated:',obj.id );

           },
   );

}

updateSaleProd(obj:any) {
  this.myService.updateProduct(obj.id ,{prodsale:obj.sale}).then(
    (res) => {
      console.log('Product updated:',obj.id );

           },
   );

}


updateProduct(id: number) {
  //console.log("Update product ", id);
  const productId=String(id) ;
  this.router.navigate(['/updateproduct/'+productId]);

}
deleteProduct(id: number) {

  
this.myService.DeleteProduct(String(id)).then(
  (res) => {
    console.log('Product deleted:', res);
    console.log(res)

         },);
}




  get isSearch() {
    return this.searchTerm != '' ? true : false;
  }

  get filteredProducts(): IProduct[] {
    return this.prdList.filter((product: IProduct) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  GetAllProducts() {
    this.myService.getAllProducts()
      .subscribe({
        next: (products) => {

          this.prdList = products.sort((a, b) => a.category.localeCompare(b.category));
        },
        error: () => { console.log("7asal Error") }
      })

  }
  getProductsByCategory(): IProduct[] {
    console.log(this.sentCat)
    return this.prdList.filter(product =>{
      product.category.includes(this.sentCat)
      this.GetAllProducts()
    } );

  }
  /*serach(){
     return this.prdListOfCat.filter((product:IProduct) =>{
       product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
     })
   }*/
  /* getelemByCat(){
     console.log(this.sentCatID)
     this.myService.getProductsByCategoryid(this.sentCatID)
     .subscribe(
       {
         next:(products:any)=>{
           
           this.prdListOfCat = products;
         },
         error:()=>{console.log("7asal Error")}
       })
     }*/

  ngOnChanges(): void {
    // this.filterProductsByCatID();
    // this.prdListOfCat=this.staticPrdService.getProductsByCatID(this.sentCatID);
    this.GetAllProducts()
  }



  ngOnInit(): void {
    this.GetAllProducts()




  }
}



