const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');
var db = require('../config/db');

var serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  verifyGoogleToken: function (req, res) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    //const secret = req.app.get('jwt-secret');
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedIdToken => {
        console.log('ID Token correctly decoded', decodedIdToken);
        admin
          .auth()
          .getUser(decodedIdToken.uid)
          .then(UserRecord => {
            var email = UserRecord.email;
            var name = UserRecord.displayName;
            var password = UserRecord.uid;
            var photoURL = UserRecord.photoURL;
            authModel
              .checkUserExist(email, password, name, photoURL)
              .then(result => {
                console.log(result);
              });
          });
      })
      .catch(error => {
        console.error('Error while getting Firebase User record:', error);
        res.json({ code: 403, error: 'Unauthorized' });
      })
      .catch(error => {
        console.error('Error while verifying Firebase ID token:', error);
        res.json({ code: 403, error: 'Unauthorized' });
      });
  },

  issueJWT: function () {},
};
