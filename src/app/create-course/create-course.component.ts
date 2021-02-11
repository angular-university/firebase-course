import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Course} from '../model/course';
import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
import {convertSnaps} from '../services/db-utils';
import {from, Observable, throwError} from 'rxjs';
import {CoursesService} from '../services/courses.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';


@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  form = this.fb.group({
    description: ['', Validators.required],
    url: ['', Validators.required],
    category: ['BEGINNER', Validators.required],
    longDescription: ['', Validators.required]
  });

  courseId:string;

  uploadPercent$ : Observable<number>;

  iconUrl:string;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private courses: CoursesService,
    private router: Router,
    private storage: AngularFireStorage) {

  }

  ngOnInit() {
    this.courseId = this.afs.createId();
  }

  onCreateCourse() {

    const newCourse = {...this.form.value} as Course;

    newCourse.iconUrl = this.iconUrl;

    console.log("Creating course with Id: ", this.courseId);

    this.courses.createCourse(newCourse, this.courseId)
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

  uploadThumbnail(event) {

    const file: File = event.target.files[0];

    const filePath = `courses/${this.courseId}/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public",
    });

    this.uploadPercent$ = task.percentageChanges();

    task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL()),
        tap(url => this.iconUrl = url),
        catchError(err => {
          console.log(err);
          alert("Could not create thumbnail url.");
          return throwError(err);
        })
      )
      .subscribe();
  }

}
