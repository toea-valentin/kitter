import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUserData(id: string){
    return this.firestore
      .collection('users', (ref) => ref.where('uid', '==', id))
      .get();
  }

  getAllUsers(){
    return this.firestore
      .collection('users')
      .get();
  }
}
