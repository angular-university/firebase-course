
const admin = require('firebase-admin');

admin.initializeApp({
  databaseURL: ""
});

export const db = admin.firestore();

export const auth = admin.auth()
