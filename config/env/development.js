
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/caledoniawhisky',
  session: {
      "secret_token": "e9e30e22527b53457738caaf3b3169d7fff4fe2e220390bb4aaeeaec5486e4538646b9408d90627c69246c481edf59974a5bc8d795aaf38da4cf9488e0e85dd3"
  },
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
