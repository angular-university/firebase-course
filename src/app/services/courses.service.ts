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
        first(),
        shareReplay()
      );
  }

  loadCourseByCategory(category: string) {
    return this.afs.collection(
      "courses",
      ref => ref.where("categories", "array-contains", category).orderBy('seqNo')
    )
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Course>(snaps)),
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
        first(),
        shareReplay()
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
        first(),
        shareReplay()
      );

  }
  createCourse(newCourse: Partial<Course>, courseId?:string) {
    return this.afs.collection<Course>('courses', ref => ref.orderBy('seqNo', 'desc').limit(1))
      .valueChanges()
      .pipe(
        first(),
        concatMap(courses => {

          const lastCourseSeqNo = courses[0]?.seqNo ?? 0;

          const course = {
            ...newCourse,
            seqNo: lastCourseSeqNo + 1
          };

          let save$: Observable<any>;

          if (courseId) {
            save$ = from(this.afs.doc(`courses/${courseId}`).set(course));
          }
          else {
            save$ = from(this.afs.collection('courses').add(course));
          }

          return save$
            .pipe(
              map(res => {
                return {
                  id: courseId ?? res.id,
                  ...course
                };
              })
            );
        })
      );
  }

  updateCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return from(this.afs.doc(`courses/${courseId}`).update(changes));
  }

  deleteCourse(courseId: string) {
   return from(this.afs.doc(`courses/${courseId}`).delete());
  }

  deleteCourseAndLessons(courseId: string) {
    return this.afs.collection(`courses/${courseId}/lessons`)
      .snapshotChanges()
      .pipe(
        concatMap(lessons => {

          const batch = this.afs.firestore.batch();

          const courseRef = this.afs.doc(`courses/${courseId}`).ref;

          batch.delete(courseRef);

          lessons.forEach(lesson => {
            const lessonRef = this.afs.doc(`courses/${courseId}/lessons/${lesson.payload.doc.id}`).ref;
            batch.delete(lessonRef);
          });

          return from(batch.commit());
        })
      );

  }


}





















