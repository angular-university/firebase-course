import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {concatMap, filter, map} from 'rxjs/operators';
import {UserRoles} from '../model/user-roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  roles$: Observable<UserRoles>;

  constructor(private afAuth: AngularFireAuth) {
    this.roles$ = afAuth.authState
      .pipe(
        concatMap(user => user ? from(user.getIdTokenResult()) : of(null)),
        map(token => token?.claims ?? {admin: false})
      );
  }

}
