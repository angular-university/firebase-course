import {Component, OnInit} from '@angular/core';


import 'firebase/firestore';

import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';
import {COURSES, findLessonsForCourse} from './db-data';



@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {


  }

  save() {

    const firebaseCourseRef =
      this.db.doc('/courses/JVXlcA6ph98c7Vg2nc4E').ref;

    const rxjsCourseRef =
      this.db.doc('/courses/MsU0Mz7pNSbnhzYSkt9y').ref;

    const batch = this.db.firestore.batch();

    batch.update(firebaseCourseRef, {titles: {description: 'Firebase Course'}});

    batch.update(rxjsCourseRef, {titles: {description: 'RxJs Course'}});

    const batch$ = of(batch.commit());

    batch$.subscribe();

  }

  async runTransaction() {
    /*
            const newCounter = await this.db.firestore
                .runTransaction(async transaction => {

                console.log('Running transaction...');

                const courseRef = this.db.doc('/courses/JVXlcA6ph98c7Vg2nc4E').ref;

                const snap = await transaction.get(courseRef);

                const course = <Course> snap.data();

                const lessonsCount =  course.lessonsCount + 1;

                transaction.update(courseRef, {lessonsCount});

                return lessonsCount;

            });

            console.log("result lessons count = ",newCounter);*/


  }


  async uploadData() {
    const coursesCollection = this.db.collection('courses');
    const courses = await this.db.collection('courses').get();
    for (let course of Object.values(COURSES)) {
      const newCourse = this.removeId(course);
      const courseRef = await coursesCollection.add(newCourse);
      const lessons = await courseRef.collection('lessons');
      const courseLessons = findLessonsForCourse(course['id']);
      console.log(`Uploading course ${course['titles']['description']}`);
      for (const lesson of courseLessons) {
        const newLesson = this.removeId(lesson);
        await lessons.add(newLesson);
      }
    }
  }

  removeId(data: any) {
    const newData: any = {...data};
    delete newData.id;
    return newData;
  }


}
















