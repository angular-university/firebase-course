import * as functions from "firebase-functions";

//
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//


export const onAddCourseUpdatePromoCounter =
    functions
        .runWith({
            timeoutSeconds: 300,
            memory: "128MB"
        })
        .firestore.document("courses/{courseId}")
        .onCreate(async (snap, context) => {

            functions.logger.debug(
                `Running add course trigger for courseId ${context.params.courseId}`);


        });
