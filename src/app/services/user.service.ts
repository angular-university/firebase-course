import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";


@Injectable({
    providedIn: "root"
})
export class UserService {

    isLoggedIn$ : Observable<boolean>;

    isLoggedOut$: Observable<boolean>;

    pictureUrl$: Observable<string>;

    constructor(private afAuth: AngularFireAuth) {

        afAuth.idToken.subscribe(jwt => console.log("jwt", jwt));

        afAuth.authState.subscribe(auth => console.log("auth", auth));

    }


}
