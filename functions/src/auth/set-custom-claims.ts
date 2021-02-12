import * as functions from 'firebase-functions';
import {auth} from '../common/init';


export default async (snap, context) => {

  functions.logger.debug(`Setting custom claims for userId ${context.params.userId}`);

  const user = snap.data();

  return auth.setCustomUserClaims(snap.id, { admin: user.admin });

}
