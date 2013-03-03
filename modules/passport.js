var db = require('../modules/db.js').db;

function findById(id, done) {
  db.users.findOne({_id: db.ObjectId(id)}, function(err, found_user) {
    if (err) console.log("Could not find user with id of " + id);
    else {
      var user = {
        id: id,
        username : found_user.username,
        password: found_user.password
      };
      done(err, user);
    }
  })
};

function findByUsername(username, done){
  db.users.findOne({username: username}, function(err, found_user) {
    if (err) console.log("Could not find user with name of " + username);
    else {
      var user = {
        id: found_user._id,
        username : found_user.username,
        password: found_user.password
      };
      done(err, user);
    }
  })
}

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

exports.passport = passport