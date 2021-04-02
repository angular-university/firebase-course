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
import {CoursesService} from "../services/courses.service";

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  courseId:string;

  form = this.fb.group({
     description:  ['', Validators.required],
      category: ["BEGINNER", Validators.required],
      url: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: [false],
      promoStartAt: [null]
  });

  constructor(private fb:FormBuilder,
              private coursesService:CoursesService,
              private afs: AngularFirestore,
              private router: Router) {

  }

  ngOnInit() {
      this.courseId = this.afs.createId();
  }

    onCreateCourse() {

      const newCourse = {...this.form.value} as Course;

      newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

      console.log(newCourse);

      this.coursesService.createCourse(newCourse, this.courseId)
          .pipe(
              tap(course => {
                  console.log("Created new course: ", course);
                  this.router.navigateByUrl("/courses");
              }),
              catchError(err => {
                  console.log(err);
                  alert("Could not create the course.");
                  return throwError(err);
              })
          )
          .subscribe();




    }
}
