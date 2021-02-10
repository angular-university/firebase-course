import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Course} from '../model/course';
import {catchError, concatMap, map, take, tap} from 'rxjs/operators';
import {convertSnaps} from '../services/db-utils';
import {from, throwError} from 'rxjs';
import {CoursesService} from '../services/courses.service';
import {Router} from '@angular/router';


@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent {

  form = this.fb.group({
    description: ['', Validators.required],
    url: ['', Validators.required],
    category: ['BEGINNER', Validators.required],
    longDescription: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private courses: CoursesService,
    private router: Router) {

  }

  onCreateCourse() {

    const newCourse = this.form.value as Course;

    this.courses.createCourse(newCourse)
      .pipe(
        tap(course => {
          console.log("Created new course: ", course);
          this.router.navigateByUrl("/courses");
        }),
        catchError(err => {
          console.log(err);
          alert('Could not create course.');
          return throwError(err);
        })
      ).subscribe();
  }
}
