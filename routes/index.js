exports.routes = function(app, controllers) {

  // Routes

  app.get('/', controllers.index);
  app.get('/about', controllers.about);
  app.get('/new', controllers.new);
  app.post('/create', controllers.create);
  app.get('/show/:id', controllers.show);
  app.get('/edit/:id', controllers.edit);
  app.post('/update/:id', controllers.update);
}