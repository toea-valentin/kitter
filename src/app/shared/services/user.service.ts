import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUserData(id: string) {
    return this.firestore
      .collection('users', (ref) => ref.where('uid', '==', id))
      .get();
  }

  getAllUsers() {
    return this.firestore.collection('users').get();
  }

  updateUserData(uid: string, name: string, bio: string, location: string) {
    let userDoc = this.firestore
      .collection('users', (ref) => ref.where('uid', '==', uid))
      .get();

    userDoc.subscribe(async (data) => {
      const collectionId = data.docs[0].id;
      await this.firestore.collection('users').doc(collectionId).update({
        name: name,
        bio: bio,
        location: location,
      });
    });
  }
}
