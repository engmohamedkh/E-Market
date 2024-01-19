import { ICategory } from '../Helpers/Icategory';
import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc,deleteDoc, collection, collectionData,
doc, getDoc, updateDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  constructor( private firestore: Firestore ) { }
  getAllCategories(): Observable<any[]> {
    let aCollection = collection(this.firestore, 'category')
    return collectionData(aCollection,{idField:'id'});
  }

  AddProduct(cat:ICategory){
    let aCollection = collection(this.firestore, 'category')
    return (addDoc(aCollection, cat));
  }



  DeleteProduct(id: string){
    const ref = doc(this.firestore,'category/'+id);
    console.log(ref)
    return (deleteDoc(ref));
  }


  /*updateItem(id:string ,prod:IProduct): Promise<void>{
    const noteRef=doc(this.firestore,"products/"+id);
    // We need to make sure the document exists before trying to update it
    return getDoc(noteRef).then((documentSnapshot) => {
      if (!documentSnapshot.exists()) {
        throw new Error(`Document ${id} does not exist!`);
      }else{
       
        return updateDoc(noteRef, prod);
      }
    })
  }*/
}
