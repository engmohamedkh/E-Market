import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { IProduct } from '../../Helpers/Iproduct';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private myClient: HttpClient) { }
  private URL_DB = "http://localhost:3000/products"; //put the link here
  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Write error details in Generic error log  by add API which will be call when error occur and
    // and store it  into data base  

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Error occured, please try again')// which display to user screen
    )
  }
  
  getAllProducts():Observable<IProduct[]>  {
    return this.myClient.get<IProduct[]>(this.URL_DB).
      pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getProductByID(id: number) {
    return this.myClient.get(this.URL_DB + "/" + id);
  }

  getProductByName(name: string) {
    const params = { name: name };
    return this.myClient.get(this.URL_DB, { params: params }).
      pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getProductsByCategoryid(categoryId: number) {
    const params = { categoryId: categoryId };
    return this.myClient.get(this.URL_DB+"/?category_id="+categoryId).
      pipe(
        retry(2),
        catchError(this.handleError)
      );;
  }
  addNewProduct(newProduct:IProduct) {//check if category is exist before use
    return this.myClient.post(this.URL_DB, newProduct);
  }
  deleteProduct(id: number) {
    return this.myClient.delete(this.URL_DB + "/" + id);
  }
  updateProduct(id: number, newProduct: any) {
    return this.myClient.patch(this.URL_DB + "/" + id, newProduct);
  }
}
