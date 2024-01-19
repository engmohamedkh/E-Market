import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  constructor(private myClient:HttpClient) {}
  private URL_DB = ""; //put the link here
  getAllCategorys(){
    return this.myClient.get(this.URL_DB);
  }

  getCategoryByID(id:number){
    return this.myClient.get(this.URL_DB+"/"+id);
  }
  addNewCategory(newCategory:any){
    return this.myClient.post(this.URL_DB,newCategory);
  }
  deleteCategory(id:number)
  {
    return this.myClient.delete(this.URL_DB+"/"+id);
  }
  updateCategory(id:number,newProduct:any)
  {
    return this.myClient.patch(this.URL_DB+"/"+id,newProduct);
  }
}