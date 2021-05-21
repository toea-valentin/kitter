import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  getMessages() {
    return this.firestore.collection('messages').get();
  }

  postMessage(message: string, user: User) {
    let post = {
      uid: user.uid,
      timestamp: firebase.firestore.Timestamp.now(),
      message: message,
      username: user.name,
      picture: user.picture,
    };

    this.firestore
      .collection('messages')
      .add(post)
      .then(
        (response) => response,
        (error) => console.log(error)
      );
  }

  getAllPosts() {
    return this.firestore
      .collection('messages', (ref) => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges();
  }

  getPostsFromUser(userId: string) {
    return this.firestore
      .collection('messages', (ref) =>
        ref.orderBy('timestamp', 'desc').where('uid', '==', userId)
      )
      .snapshotChanges();
  }

  getPostsFromUserOneTime(userId: string) {
    return this.firestore
      .collection('messages', (ref) =>
        ref.orderBy('timestamp', 'desc').where('uid', '==', userId)
      )
      .get();
  }

  async deletePost(id: string) {
    await this.firestore.collection('messages').doc(id).delete();
  }
}
