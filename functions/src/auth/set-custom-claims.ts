import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

export default async (request, response) => {

  functions.logger.info("Setting custom claims");

  await admin.auth().setCustomUserClaims(uid, { admin: true });

  response.send("Hello from Firebase!");
}
