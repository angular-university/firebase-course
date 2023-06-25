import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { CoursesService } from '../services/course.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
      private router: Router,
      private coursesService: CoursesService) {}

    ngOnInit() {

      this.reloadCourses();

    }

    reloadCourses() {

      this.beginnersCourses$ = this.coursesService.loadCoursesByCategory("BEGINNER");
      this.advancedCourses$ = this.coursesService.loadCoursesByCategory("ADVANCED");
    }

}
