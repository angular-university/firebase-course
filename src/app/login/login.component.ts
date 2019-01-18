import {Component, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    ui: firebaseui.auth.AuthUI;

    constructor(private afAuth: AngularFireAuth) {

    }

    ngOnInit() {

        const uiConfig = {

            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {

                signInSuccessWithAuthResult: this
                    .onLoginSuccessful
                    .bind(this)
            }

        };

        this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

        this.ui.start('#firebaseui-auth-container', uiConfig);


    }

    onLoginSuccessful() {


    }
}


