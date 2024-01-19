import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Helpers/Icategory';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../Helpers/Iproduct';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './update-product.component.html',
  styles: ``
})
export class UpdateProductComponent implements OnInit{
  productId: string=''
  newPrd: IProduct= {} as IProduct
  dropdownValues:ICategory[]=[];
  selectedValue: string='';
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
  constructor(private router: Router,
    private route: ActivatedRoute ,
    private _snackBar: MatSnackBar,
    private productService : ProductsService,
    private CategoryService : CategoryService) {
    this.productId = route.snapshot.params["id"];
  }
  onSelectionChange(value: string) {
  
    this.selectedValue = value;
  }
  ngOnInit(): void {
console.log(this.productId)
this.CategoryService.getAllCategories()
.subscribe({
  next: (Cats) => {
    console.log(Cats)
    this.dropdownValues = Cats;
    console.log(this.dropdownValues)
  },
  error: () => { console.log("7asal Error") }
})
this.productService.getProductById(this.productId).subscribe({
  next: (prod) => {
    this.newPrd=prod
    this.productname=prod.name;
    this.selectedValue=prod.category
    this.productbrand=prod.brand
    this.productprice=prod.price
    this.productdiscrib=prod.description
    this.productquantity=prod.quantity
    this.info1=prod.info1
    this.info2=prod.info2
    this.info3=prod.info3
  
    this.img_url1=prod.imgURL1
    this.img_url2=prod.imgURL2

    
  },
  error: () => { console.log("7asal Error") }
})
}

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


Update()
{

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
    
    this.productService.updateProduct(this.productId ,this.newPrd).then(
      (res) => {
        this._snackBar.open("You Update Product Successfully", "Ok");
        this.router.navigate(['/product']);
  
             },
     );
} 
}
}
