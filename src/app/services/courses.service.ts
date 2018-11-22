

import {Injectable} from "@angular/core";
import {from, NEVER, never, Observable, of} from 'rxjs';
import {Course} from "../model/course";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";



@Injectable()
export class CoursesService {

    constructor() {

    }

    findCourseById(courseId: number): Observable<Course> {
        return NEVER;
    }

    findAllCourses(): Observable<Course[]> {
        return of([]);
    }

    findAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return of([]);
    }

    findLessons(
        courseId:number, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

        return of([]);
    }

}
