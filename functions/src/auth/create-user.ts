import {auth, db} from '../common/init';
import * as functions from 'firebase-functions';
import {getUserCredentialsMiddleware} from '../middleware/auth.middleware';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

export const createUserApp = express();

createUserApp.use(bodyParser.json());
createUserApp.use(cors({origin: true}));
createUserApp.use(getUserCredentialsMiddleware);


createUserApp.post('/', async (req, res) => {

    functions.logger.debug(`Calling create user function.`);

    if (!(req["uid"] && req["admin"])) {
      const message = `Denied access to user creation service.`;
      functions.logger.debug(message);
      res.status(403).json({message});
      return;
    }

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



