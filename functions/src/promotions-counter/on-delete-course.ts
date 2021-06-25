
import * as functions from 'firebase-functions';


export default async (snap, context) => {

    functions.logger.debug(
        `Running delete course trigger for courseId ${context.params.courseId}`);




}
