import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData = new BehaviorSubject<any>(null);
  public error = new BehaviorSubject<string>('');

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    const localUserData = JSON.parse(localStorage.getItem('account'));
    if (localUserData) this.userData.next(localUserData);
  }

  getUserData(): BehaviorSubject<any> {
    return this.userData;
  }

  getError(): BehaviorSubject<string> {
    return this.error;
  }

  setError(errorMessage: string): void {
    this.error.next(errorMessage);

    setTimeout(() => {
      this.error.next('');
    }, 3000);
  }

  userFromFirestore(id: string) {
    return this.firestore
      .collection('users', (ref) => ref.where('uid', '==', id))
      .get();
  }

  addUserToFirestore(user) {
    this.firestore
      .collection('users')
      .add(user)
      .then(
        (response) => {
          this.userData.next(user);
          localStorage.setItem('account', JSON.stringify(user));
        },
        (error) => error && error.message && this.setError(error.message)
      );
  }

  emailLogin(email: string, password: string) {
    this.error.next('');

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.userFromFirestore(value.user.uid).subscribe((firestoreUser) => {
          let userData = firestoreUser.docs[0].data();
          this.userData.next(userData);
          localStorage.setItem('account', JSON.stringify(userData));

          this.router.navigateByUrl('/home');
        });
      })
      .catch((error) => error && error.message && this.setError(error.message));
  }

  emailSignup(name: string, email: string, password: string) {
    this.error.next('');

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        this.userFromFirestore(value.user.uid).subscribe((firestoreUser) => {
          if (firestoreUser.docs.length == 0) {
            const user = {
              uid: value.user.uid,
              name: name,
              picture: '',
              email: email,
              bio: 'bio',
              location: 'location',
            };
            this.addUserToFirestore(user);
            this.router.navigateByUrl('/home');
          }
        });
      })
      .catch((error) => error && error.message && this.setError(error.message));
  }

  googleLogin() {
    this.error.next('');

    const provider = new firebase.auth.GoogleAuthProvider();

    return this.oAuthLogin(provider)
      .then((value) => {
        this.userFromFirestore(value.user.uid).subscribe((firestoreUser) => {
          if (firestoreUser.docs.length == 0) {
            const user = {
              uid: value.user.uid,
              name: value.user.displayName,
              picture: value.user.photoURL,
              email: value.user.email,
              bio: 'bio',
              location: 'location',
            };
            this.addUserToFirestore(user);
          } else {
            let userData = firestoreUser.docs[0].data();
            this.userData.next(userData);
            localStorage.setItem('account', JSON.stringify(userData));
          }
          this.router.navigateByUrl('/home');
        });
      })
      .catch((error) => error && error.message && this.setError(error.message));
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.userData.next(null);
      localStorage.removeItem('account');
      this.router.navigate(['/']);
    });
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider);
  }
}
