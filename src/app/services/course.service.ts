import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map} from 'rxjs/operators';
import {Course} from '../model/course';
import {snapChanges} from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private db: AngularFirestore) {
  }

  loadAllCourses() {
    return this.db.collection('courses').snapshotChanges().pipe(map(snaps => {
      const courses = <Course[]>snapChanges(snaps);
      return courses;
    }), first());
  }
}
