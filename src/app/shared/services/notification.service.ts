import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private firestore: AngularFirestore) {}

  addNotification(
    followerId: string,
    followerName: string,
    uid: string,
    message: string = 'started following you.'
  ) {
    const notification = {
      followerId,
      followerName,
      message,
      uid,
      timestamp: firebase.firestore.Timestamp.now()
    };

    this.firestore
      .collection('notifications')
      .add(notification)
      .then(
        (response) => response,
        (error) => console.log(error)
      );
  }

  getNotifications(userId: string) {
    return this.firestore
      .collection('notifications', (ref) => ref.where('uid', '==', userId))
      .snapshotChanges();
  }
}
