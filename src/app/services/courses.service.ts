import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Course} from '../model/course';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, concatMap, first, map, shareReplay, take, tap} from 'rxjs/operators';
import {convertSnaps} from './db-utils';
import {Lesson} from '../model/lesson';
import firebase from 'firebase/app';
import OrderByDirection = firebase.firestore.OrderByDirection;


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private afs: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    return this.afs.collection(
      'courses',
      ref => ref.orderBy('seqNo')
    )
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Course>(snaps)),
        tap(console.log),
        first(),
        shareReplay()
      );
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.afs.collection('courses',
      ref => ref.where('url', '==', courseUrl))
      .snapshotChanges()
      .pipe(
        map(snaps => {

          const courses = convertSnaps<Course>(snaps);

          return courses.length == 1 ? courses[0] : undefined;
        }),
        first()
      );
  }

  findLessons(courseId: string, sortOrder: OrderByDirection = 'asc',
              pageNumber = 0, pageSize = 3): Observable<Lesson[]> {

    return this.afs.collection(`courses/${courseId}/lessons`,
      ref => ref.orderBy('seqNo', sortOrder)
        .limit(pageSize)
        .startAfter(pageNumber * pageSize))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Lesson>(snaps)),
        first()
      );

  }

  createCourse(newCourse: Course) {
    return this.afs.collection<Course>('courses', ref => ref.orderBy('seqNo', 'desc').limit(1))
      .valueChanges()
      .pipe(
        first(),
        concatMap(courses => {

          const lastCourseSeqNo = courses[0]?.seqNo ?? 0;

          return from(this.afs.collection('courses').add({
            ...newCourse,
            seqNo: lastCourseSeqNo + 1
          }))
            .pipe(
              map(res => {
                return {
                  id: res.id,
                  ...newCourse
                };
              })
            );
        })
      );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return from(this.afs.doc(`courses/${courseId}`).update(changes));
  }


}





















