import {Injectable} from '@angular/core';
import {from, NEVER, never, Observable, of} from 'rxjs';
import {Course} from '../model/course';
import {first, map} from 'rxjs/operators';
import {Lesson} from '../model/lesson';
import {Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot} from '@angular/fire/firestore';


@Injectable()
export class CoursesService {

  constructor(private db: AngularFirestore) {

  }

  findAllCourses(): Observable<Course[]> {
    return this.db.collection('courses', ref => ref.orderBy('seqNo')).snapshotChanges()
      .pipe(
        map(snaps => this.convertSnaps<Course>(snaps)),
        first()
      );
  }

  findCourseById(courseId: string): Observable<Course> {
    return this.db.doc(`courses/${courseId}`).snapshotChanges()
      .pipe(
        map(snap => this.convertDocSnap<Course>(snap))
      );
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.collection('courses', ref => ref.where("courseUrl", "==", courseUrl) )
      .snapshotChanges()
      .pipe(
        map(snaps => {

          const results = this.convertSnaps<Course>(snaps);

          return results.length == 1 ? results[0]: undefined
        }),
      );
  }


  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return of([]);
  }


  findLessons(
    courseId: string, sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Lesson[]> {

    return this.db.collection(`courses/${courseId}/lessons`, ref => ref.orderBy('seqNo', <any>sortOrder).limit(pageSize).startAfter(pageNumber * pageSize))
      .snapshotChanges()
      .pipe(
        map(snaps => this.convertSnaps<Lesson>(snaps)),
        first()
      );
  }

  convertDocSnap<T>(docSnap) {
    return <Course> {
      ...docSnap.payload.data(),
      id: docSnap.payload.id
    };
  }

  convertSnaps<T>(snaps) {
    let courses: T[] = [];

    snaps.forEach(snap => {

      courses.push(<T> {
        ...snap.payload.doc.data(),
        id: snap.payload.doc.id
      });

    });
    return courses;
  }

}
