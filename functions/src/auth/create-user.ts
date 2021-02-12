import {auth, db} from '../common/init';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

export const createUserApp = express();

createUserApp.use(bodyParser.json());

// Automatically allow cross-origin requests
createUserApp.use(cors({origin: true}));

createUserApp
  .post('/', async (req, res) => {

    const email = req.body.email,
      password = req.body.password,
      admin = req.body.admin;

    const user = await auth.createUser({
      email,
      password
    });

    await auth.setCustomUserClaims(user.uid, {admin});

    return db.doc(`users/${user.uid}`).set();

  });



