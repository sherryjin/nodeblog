
/**
 * Module dependencies.
 */

var express = require('express')
  ,  controllers = require('./controllers'),
  router = require('./routes');

var db = require('./modules/db.js').db

var passport = require('./modules/passport.js').passport;

var app = module.exports = express.createServer();

var MemoryStore = express.session.MemoryStore,
    sessionStore = new MemoryStore();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({
    store: sessionStore, 
    secret: 'keyboard cat'
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(function(req, res, next) {
    res.send('Sorry ' + req.url + " does not exist.");
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Compatible

// Now less files with @import 'whatever.less' will work(https://github.com/senchalabs/connect/pull/174)
var TWITTER_BOOTSTRAP_PATH = './vendor/twitter/bootstrap/less';
express.compiler.compilers.less.compile = function(str, fn){
  try {
    var less = require('less');var parser = new less.Parser({paths: [TWITTER_BOOTSTRAP_PATH]});
    parser.parse(str, function(err, root){fn(err, root.toCSS());});
  } catch (err) {fn(err);}
}

router.routes(app, controllers);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
