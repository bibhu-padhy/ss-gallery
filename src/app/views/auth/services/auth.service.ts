import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth'
import { UserDataModel } from 'src/app/shared/user';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { }

  async login() {
    const user = await this.auth.signInWithPopup(new GoogleAuthProvider())
    if (user.user) {
      const userInfo: UserDataModel = {
        displayName: user?.user?.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL,
        uid: user.user.uid,
        emailVerified: user.user.emailVerified
      }
      await this.checkUserExistOrNot(user?.additionalUserInfo?.isNewUser, userInfo);
      this.router.navigateByUrl('');
    }
  }
  logout() {
    this.auth.signOut();
    location.reload();
  }

  async checkUserExistOrNot(isNewUser: boolean | undefined, newUser: UserDataModel) {
    if (isNewUser) {
      await this.storeUserData(newUser);
    }
  }

  async storeUserData(data: UserDataModel) {
    await this.afs.collection('users')
      .add(data);
  }
  private isLoggedIn() {
    return this.auth.authState.pipe(first()).toPromise();
  }
  async getUserId() {
    const user = await this.isLoggedIn()
    return user.uid
  }
}
