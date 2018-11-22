import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "../services/courses.service";
import {map} from "rxjs/operators";

import * as firebase from 'firebase/app';
import 'firebase/firestore';


var config = {
  apiKey: 'AIzaSyDAdoefqX5OqjkD3BkW25ZAL6XYZMo4Vz8',
  authDomain: 'fir-course-17549.firebaseapp.com',
  databaseURL: 'https://fir-course-17549.firebaseio.com',
  projectId: 'fir-course-17549',
  storageBucket: 'fir-course-17549.appspot.com',
  messagingSenderId: '170806523820'
};

firebase.initializeApp(config);

const db = firebase.firestore();

const settings = {timestampsInSnapshots: true};

db.settings(settings);



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses: Course[];

    advancedCourses: Course[];

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {

      db.collection("courses").get()
        .then(snaps => {

          let courses = [];

          snaps.forEach(doc => courses.push({...doc.data(), id: doc.id}));

          courses = courses.sort((c1:any, c2:any) => c1.seqNo - c2.seqNo);

          console.log(courses);

          this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER' );

          this.advancedCourses = courses.filter(course => course.category === 'ADVANCED' );

        });



      /*

        const courses$ = this.coursesService.findAllCourses();

        this.beginnerCourses$ = courses$.pipe(
          map(courses => courses.filter(course => course.category === 'BEGINNER') )
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED') )
        );

        */

    }

}
