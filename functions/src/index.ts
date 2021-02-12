import * as functions from 'firebase-functions';

//
// Start writing Firebase Functions
//
// https://firebase.google.com/docs/functions/typescript
//

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

export const createUser = functions.https.onRequest(createUserApp);

export const setUserCustomClaims = functions.firestore.document('users/{userId}')
  .onCreate(async (snap, context) => {
    await (await import('./auth/set-custom-claims')).default(snap, context);
  });

export const onAddCourseUpdatePromoCounter = functions.runWith({
  timeoutSeconds: 300,
  // memory: '1GB'
}).firestore.document('courses/{courseId}')
  .onCreate(async (snap, context) => {
    await (await import('./promotions-counter/on-course-added')).default(snap, context);
  });

export const onCourseDeletedUpdatePromoCounter =
  functions.firestore.document('courses/{courseId}')
    .onDelete(async (snap, context) => {
      await (await import('./promotions-counter/on-course-deleted')).default(snap, context);
    });

export const onCourseUpdatedUpdatePromoCounter = functions.firestore
  .document('courses/{courseId}')
  .onUpdate(async (snap, context) => {
    await (await import('./promotions-counter/on-course-updated')).default(snap, context);
  });
