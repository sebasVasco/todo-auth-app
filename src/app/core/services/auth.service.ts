import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  loggedUser(): Observable<any> {
    return from(this.auth.currentUser);
  }

  signin(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  signup(email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  signout() {
    return from(this.auth.signOut());
  }
}
