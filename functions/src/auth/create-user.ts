import {auth, db} from '../common/init';
import * as functions from 'firebase-functions';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

export const createUserApp = express();

createUserApp.use(bodyParser.json());

// Automatically allow cross-origin requests
createUserApp.use(cors({origin: true}));

createUserApp
  .post('/', async (req, res) => {

    functions.logger.debug(`Calling create user function.`);

    const email = req.body.email,
      password = req.body.password,
      admin = req.body.admin;

    try {
      const user = await auth.createUser({
        email,
        password
      });

      await auth.setCustomUserClaims(user.uid, {admin});

      await db.doc(`users/${user.uid}`).set({});

      res.status(200).json({message: "User created successfully."});
    }
    catch(err) {
      functions.logger.error(`Could not create user.`, err);
      res.status(500).json({message: "Could not create user."});
    }

  });



