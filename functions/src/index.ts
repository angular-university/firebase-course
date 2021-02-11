import * as functions from "firebase-functions";

 // Start writing Firebase Functions
 // https://firebase.google.com/docs/functions/typescript

 export const helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

 export const onAddCourseUpdatePromoCounter = functions.runWith({
  timeoutSeconds: 300,
  // memory: '1GB'
}).firestore.document('courses/{courseId}')
  .onCreate(async (snap, context) => {
    await (await import('./promotions-counter/on-course-added')).default(snap, context);
  });

