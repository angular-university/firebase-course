import {auth} from '../common/init';
import * as functions from 'firebase-functions';



export function getUserCredentialsMiddleware(req, res, next) {

  const jwt = req.headers.authorization;

  functions.logger.debug(`Attempting to extract user credentials from request.`);

  if (jwt) {
    auth.verifyIdToken(jwt)
      .then(jwtPayload => {
        req["uid"] =  jwtPayload.uid;
        req["admin"] = jwtPayload["admin"];

        functions.logger.debug(`Credentials: uid=${jwtPayload.uid}, admin=${jwtPayload.admin}`);

        next();
      })
      .catch(error => {
        const message = 'Error retrieving user credentials.';
        console.log(message, error);
        res.status(403).json({message});
      });
  }
  else {
    next();
  }
}
