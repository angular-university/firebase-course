import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    ui: firebaseui.auth.AuthUI;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router) {

    }

    ngOnInit() {

        this.afAuth.app.then(app => {
            const uiConfig = {
                signInOptions: [
                    EmailAuthProvider.PROVIDER_ID,
                    GoogleAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
                }
            };

            this.ui = new firebaseui.auth.AuthUI(app.auth());

            this.ui.start("#firebaseui-auth-container", uiConfig);

            this.ui.disableAutoSignIn();
        });


    }

    ngOnDestroy() {
        this.ui.delete();
    }

    onLoginSuccessful(result) {

        console.log('Firebase UI result:', result);

        this.router.navigateByUrl("/courses");



    }
}


