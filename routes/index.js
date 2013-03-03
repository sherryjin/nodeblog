var passport = require('../modules/passport.js').passport;

exports.routes = function(app, controllers) {

  // Routes

  app.get('/', controllers.index);
  app.get('/about', controllers.about);
  app.get('/new', ensureAuthenticated, controllers.new);
  app.post('/create', ensureAuthenticated, controllers.create);
  app.get('/show/:id', controllers.show);
  app.get('/edit/:id', ensureAuthenticated, controllers.edit);
  app.put('/update/:id', ensureAuthenticated, controllers.update);
  app.get('/new_session', controllers.new_session);
  app.post('/create_session', passport.authenticate('local', { failureRedirect: '/new_session', failureFlash: true }), controllers.create_session);
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {return next();}
  res.redirect('/new_session')
};