

const admin = require('firebase-admin');


admin.initializeApp();

export const db = admin.firestore();

export const auth = admin.auth();



