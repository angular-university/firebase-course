import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'try-emulator';

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {

    this.afs.collection("courses").valueChanges().subscribe(console.log);

  }

}
