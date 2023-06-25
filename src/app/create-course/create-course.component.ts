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
import { CoursesService } from '../services/course.service';

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})

export class CreateCourseComponent implements OnInit {

courseId: string;

  form = this.fb.group({
  description: ['', Validators.required],
  category: ["BEGINNER", Validators.required],
  url: [""],
  longDescription:  ['', Validators.required],
  promo:  [false],
  promoStartAt:  [null]


});

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage) {

  }
  uploadThumbnail(event) {
    const file:File = event.target.files[0];
    console.log(file.name);

  }

  ngOnInit() {
    this.courseId = this.afs.createId();
    
  }

}
