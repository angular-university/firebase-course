import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Course} from '../model/course';
import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
import {from, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  form = this.fb.group({
     description:  ['', Validators.required],
      category: ["BEGINNER", Validators.required],
      url: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: [false],
      promoStartAt: [null]
  });

  constructor(private fb:FormBuilder) {

  }

  ngOnInit() {

  }

    onCreateCourse() {

      const newCourse = {...this.form.value} as Course;

      newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

      console.log(newCourse);

    }
}
