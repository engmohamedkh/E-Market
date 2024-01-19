import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from '../../Helpers/Iproduct';
import { ProductsService } from '../../Services/products.service';
import { ICategory } from '../../Helpers/Icategory';
import { CategoryService } from '../../Services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports:[HttpClientModule, RouterModule,FormsModule],
  providers:[ProductsService,CategoryService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  newPrd: IProduct= {} as IProduct
  productname:string=''
  productbrand:string=''
  productprice:number=0;
  productdiscrib:string=''
  productquantity:number=0;
  info1: string=''
  info2: string=''
  info3: string=''

  img_url1:string=''
  img_url2:string=''
  dropdownValues:ICategory[]=[];
  selectedValue: string='';

  constructor( private router: Router,    private _snackBar: MatSnackBar,
    private productService : ProductsService,private CategoryService : CategoryService){}
 get productnamevalid()
 {
  return(this.productname.length>3)
 }
 get productbrandvalid()
 {
  return(this.productbrand.length>3)
 }
 get productpricevalid()
 {
  return(this.productprice>=2)
 }
 get productdiscribvalid()
 {
  return(this.productdiscrib.length>10)
 }
 get productquantityvalid()
 {
  return(this.productquantity>1)
 }

 get productinfo1valid()
 {
  return(this.info1.length>3)
 }
 get productinfo2valid()
 {
  return(this.info2.length>3)
 }
 get productinfo3valid()
 {
  return(this.info3.length>3)
 }
 
 
 get productFormvalid()
 {
return((this.productnamevalid && this.productbrandvalid && this.productpricevalid &&
  this.productdiscribvalid && this.productinfo1valid && this.productinfo2valid &&
   this.productinfo3valid && (this.img_url1.length>1) && (this.img_url2.length>1)
  ))
 }







  ngOnInit(): void{
    this.CategoryService.getAllCategories()
    .subscribe({
      next: (Cats) => {
        console.log(Cats)
        this.dropdownValues = Cats;
        console.log(this.dropdownValues)
      },
      error: () => { console.log("7asal Error") }
    })
  }
  onSelectionChange(value: string) {
  
    this.selectedValue = value;
  }

 AddProduct(){
  console.log(this.productFormvalid)
  
    if(this.productnamevalid)
    {
      this.newPrd.name=this.productname
      this.newPrd.description=this.productdiscrib
      this.newPrd.category=this.selectedValue
      this.newPrd.brand=this.productbrand
      this.newPrd.price=this.productprice
      this.newPrd.quantity=this.productquantity
      this.newPrd.info1=this.info1
      this.newPrd.info2=this.info2
      this.newPrd.info3=this.info3
      this.newPrd.imgURL1=this.img_url1
      this.newPrd.imgURL2=this.img_url2
      this.newPrd.category=this.selectedValue
      this.newPrd.prodsale=false
      this.newPrd.prodnew=false
      this.newPrd.bestSeller=false
      this.productService.AddProduct(this.newPrd).then(
        (res) => {
          this._snackBar.open("Product Is Added Successfully", "Ok");
          this.router.navigate(['/product']);
         
               },
       );
    }
    console.log(this.newPrd)

    
}




uploadFile1(input: HTMLInputElement) {
  if (!input.files) return;

  const files: FileList = input.files;

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (file) {
      this.productService.uploadFile(file)
        .then((url) => {
          this.img_url1 = url;
          console.log('File uploaded successfully. Download URL:', url);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle errors as needed
        });
    }
  }
}
uploadFile2(input: HTMLInputElement) {
  if (!input.files) return;

  const files: FileList = input.files;

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (file) {
      this.productService.uploadFile(file)
        .then((url) => {
          this.img_url2 = url;
          console.log('File uploaded successfully. Download URL:', url);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle errors as needed
        });
    }
  }
}
}
