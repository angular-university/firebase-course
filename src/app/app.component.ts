import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {concatMap, filter, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) {


  }

  ngOnInit() {

    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL : null));
  }

  logout() {

    this.afAuth.signOut();
    this.router.navigateByUrl("/login");

  }

}
