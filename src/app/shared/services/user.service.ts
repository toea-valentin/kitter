import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = new BehaviorSubject<any>(null);

  constructor(private firestore: AngularFirestore) {}

  getUserData(id: string) {
    return this.firestore
      .collection('users', (ref) => ref.where('uid', '==', id))
      .snapshotChanges();
  }

  getAllUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  findUser() {}

  updateUserData(uid: string, name: string, bio: string, location: string) {
    let userDoc = this.firestore
      .collection('users', (ref) => ref.where('uid', '==', uid))
      .get();

    return userDoc.pipe(
      map((data) => data.docs[0].id),
      switchMap((collectionId) =>
        this.firestore.collection('users').doc(collectionId).update({
          name: name,
          bio: bio,
          location: location,
        })
      )
    );
  }
}
