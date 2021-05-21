import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(
    private firestore: AngularFirestore,
    private notificationService: NotificationService
  ) {}

  addFollow(
    loggedUserId: string,
    loggedUserName: string,
    loggedUserPicture: string,
    followingUser
  ) {
    let follower = {
      uid: loggedUserId,
      name: loggedUserName,
      picture: loggedUserPicture,
      followingUserId: followingUser.uid,
      followingUserName: followingUser.name,
      followingUserPicture: followingUser.picture,
    };

    this.firestore
      .collection('followers')
      .add(follower)
      .then(
        (response) =>
          this.triggerNotification(
            loggedUserId,
            loggedUserName,
            followingUser.uid
          ),
        (error) => console.log(error)
      );
  }

  private triggerNotification(
    followerId: string,
    followerName: string,
    uid: string
  ) {
    this.notificationService.addNotification(followerId, followerName, uid);
  }

  isUserFollowedByLoggedUser(loggedUserId: string, followingUserId: string) {
    return this.firestore
      .collection('followers', (ref) =>
        ref
          .where('uid', '==', loggedUserId)
          .where('followingUserId', '==', followingUserId)
      )
      .snapshotChanges();
  }

  deleteFollow(loggedUserId: string, followingUserId: string) {
    let followDoc = this.firestore
      .collection('followers', (ref) =>
        ref
          .where('uid', '==', loggedUserId)
          .where('followingUserId', '==', followingUserId)
      )
      .get();

    followDoc.subscribe(async (data) => {
      const collectionId = data.docs[0].id;
      await this.firestore.collection('followers').doc(collectionId).delete();
    });
  }

  getUserFollowing(id: string) {
    return this.firestore
      .collection('followers', (ref) => ref.where('uid', '==', id))
      .snapshotChanges();
  }

  getUserFollowers(id: string) {
    return this.firestore
      .collection('followers', (ref) => ref.where('followingUserId', '==', id))
      .snapshotChanges();
  }
}
