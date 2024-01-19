import { Iuser } from '../Helpers/Iuser';
import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc,deleteDoc, collection, collectionData,
doc, getDoc, updateDoc, query, where, getDocs, 
setDoc} from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor( private firestore: Firestore, private  storage: Storage ) { }

  getAllUsers(): Observable<any[]> {
    let aCollection = collection(this.firestore, 'user')
    return collectionData(aCollection,{idField:'id'});
  }

  AddUser(user:Iuser){
    let aCollection = collection(this.firestore, 'user')
    return (addDoc(aCollection, user));
  }

  DeleteUser(id: string){
    const ref = doc(this.firestore,'user/'+id);
    console.log(ref)
    return (deleteDoc(ref));
  }

  /*getUserByemail(email: string): Observable<any> {
    const userDocRef = doc(this.firestore, 'users', email);
    console.log('sad ',userDocRef)
    return new Observable((observer) => {
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            observer.next(userData);
          } else {
           observer.next("")
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }*/
}
