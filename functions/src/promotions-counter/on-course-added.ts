import * as functions from 'firebase-functions';
import {db} from '../common/init';
import {firestore} from 'firebase-admin/lib/firestore';
import FieldValue = firestore.FieldValue;




export default async (snap, context) => {

  functions.logger.debug(`Running add course trigger for courseId ${context.params.courseId}`);

  const course = snap.data();

  if (course.promo) {
    functions.logger.debug('Course in promotion, incrementing counter.');
  }
  else {
    functions.logger.debug('Course NOT in promotion.');
    return;
  }

/*
  const batch = db.batch();

  const statsRef = db.doc(`courses/stats`);

  batch.update(statsRef, {
    "totalPromo": FieldValue.increment(1)
  });

  return batch.commit();

 */

  return db.doc(`courses/stats`).update({
    "totalPromo": FieldValue.increment(1)
  });

}


export async function onCourseCreated(snap, context) {

  functions.logger.debug('Running add course trigger (explicit transaction version)');

  const course = snap.data();

  return db.runTransaction(async (transaction) => {

    const counterRef = db.doc('courses/stats');

    const counterSnap = await transaction.get(counterRef);

    const counter = counterSnap.data() ?? {totalPromo: 0};

    if (course.promo) {
      counter.totalPromo += 1;
      functions.logger.debug('Course in promotion, incrementing counter.');
    }
    else {
      functions.logger.debug('Course NOT in promotion.');
    }

    transaction.set(counterRef, counter);

  });

};
