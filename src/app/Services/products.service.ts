import { IProduct } from '../Helpers/Iproduct';
import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc,deleteDoc, collection, collectionData,
doc, getDoc, updateDoc, query, where, getDocs, DocumentData } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { QuerySnapshot } from 'firebase/firestore/lite';
import { Observable, from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private firestore: Firestore, private  storage: Storage ) { }
  getAllProducts(): Observable<any[]> {
    let aCollection = collection(this.firestore, 'products')
    return collectionData(aCollection,{idField:'id'});
  }
  getProductById(productId: string): Observable<any> {
    const docRef: DocumentReference =doc(this.firestore,'products/'+productId);
    
    return from(getDoc(docRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return { ...docSnapshot.data(), id: docSnapshot.id };
        } else {
          throw new Error('Document does not exist!');
        }
      })
    );
  }

  getProductByCat(category: string): Observable<any[]> {
    const collectionRef= collection(this.firestore, 'products')
    const queryy = query(collectionRef, where('category', '==', category));

    return from(getDocs(queryy)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
    );
  }
  

  AddProduct(prod:IProduct){
    let aCollection = collection(this.firestore, 'products')
    return (addDoc(aCollection, prod));
  }



  DeleteProduct(id: string){

    const ref = doc(this.firestore,'products/'+id);
    console.log(ref)
    return (deleteDoc(ref));
  }


  updateProduct(id:string ,prod:any): Promise<void>{
    const ref = doc(this.firestore,'products/'+id);
    // We need to make sure the document exists before trying to update it
    return getDoc(ref).then((documentSnapshot) => {
      if (!documentSnapshot.exists()) {
        throw new Error(`Document ${id} does not exist!`);
      }else{
       
        return updateDoc(ref, prod);
      }
    })
  }

  uploadFile(file: File): Promise<string> {
    const storageRef = ref(this.storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve: (value: string) => void, reject) => {
      uploadTask
        .then(() => getDownloadURL(storageRef))
        .then((url: any) => resolve(url))
        .catch((error:any) => reject(error));
    });
  }

}
