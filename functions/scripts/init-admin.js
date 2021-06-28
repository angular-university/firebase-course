

const admin = require('firebase-admin');


const serviceAccountPath = process.argv[2],
    userUid = process.argv[3];

console.log(`Using service account ${serviceAccountPath}.`);
console.log(`Setting user ${userUid} as admin.`);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
});


async function initAdmin(adminUid) {

    await admin.auth().setCustomUserClaims(adminUid, {admin:true});

    console.log("User is now an admin.");

}


initAdmin(userUid)
    .then(() => {
        console.log("Exiting.");
        process.exit();
    });
