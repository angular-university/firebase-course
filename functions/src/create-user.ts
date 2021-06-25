
const express = require('express');
import * as functions from 'firebase-functions';

const bodyParser = require('body-parser');
const cors = require('cors');

export const createUserApp = express();

createUserApp.use(bodyParser.json());
createUserApp.use(cors({origin:true}));


createUserApp.post("/", async (req, res) => {

    functions.logger.debug(`Calling create user function.`);

    try {

        const email = req.body.email,
            password = req.body.password,
            admin = req.body.admin;




        res.status(200).json({message:"User created successfully."});

    }
    catch(err) {
        functions.logger.error(`Could not create user.`, err);
        res.status(500).json({message: "Could not create user."});
    }

});

