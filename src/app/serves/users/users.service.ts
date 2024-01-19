import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private myClient:HttpClient) {}
  private URL_DB = ""; //put the link here
  getAllUsers(){
    return this.myClient.get(this.URL_DB);
  }

  getUserByID(id:number){
    return this.myClient.get(this.URL_DB+"/"+id);
  }
  addNewUser(newUser:any){
    return this.myClient.post(this.URL_DB,newUser);
  }
  deleteUser(id:number)
  {
    return this.myClient.delete(this.URL_DB+"/"+id);
  }
  updateUser(id:number,newUser:any)
  {
    return this.myClient.patch(this.URL_DB+"/"+id,newUser);
  }  
}
