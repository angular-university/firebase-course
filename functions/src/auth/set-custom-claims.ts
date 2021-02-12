import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

export default async (snap, context) => {

  functions.logger.debug(`Setting custom claims for userId ${context.params.userId}`);

  const user = snap.data();

  return admin.auth().setCustomUserClaims(snap.id, { admin: user.admin });

}
