import { Component } from '@angular/core';
import { ICategory } from '../../Helpers/Icategory';
import { CategoryService } from '../../Services/category.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RouterModule,FormsModule],
  providers:[CategoryService],
  templateUrl: './add-category.component.html',
  styles: ``
})
export class AddCategoryComponent {
  newcat:ICategory={} as ICategory
  constructor(private CategoryService : CategoryService){}
  AddCategoy(cat:ICategory){
    this.CategoryService.AddProduct(cat).then(
      (res) => {
        console.log('Product added:', res);
      alert("Product Added Successfully");
             },
     );}
}
