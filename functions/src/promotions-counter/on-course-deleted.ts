import * as functions from 'firebase-functions';
import {db} from '../common/init';
import {firestore} from 'firebase-admin/lib/firestore';
import FieldValue = firestore.FieldValue;


export default async (snap, context) => {

  functions.logger.debug(`Running delete course trigger for courseId ${context.params.courseId}`);

  const course = snap.data();

  if (!course.promo) {
    functions.logger.debug('Course was not in promotion, skipping.');
    return;
  }

  return db.doc(`courses/stats`).update({
    "totalPromo": FieldValue.increment(-1)
  });
}
