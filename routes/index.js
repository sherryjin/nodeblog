
/*
 * GET home page.
 */

var db = require('../modules/db.js').db;

exports.index = function(req, res){
  db.articles.find(function (err, articles) {
    if (err) console.log("Could not find any articles!");
    else {
      res.render('index', { 
        title: 'nodejs blog with twitter bootstrap, mongodb, and express',
        articles: articles 
      })
    }
  })
};

exports.about = function(req, res){
  res.render('about', { 
    title: 'About'
  })
};

exports.new = function(req, res){
  res.render('new', { 
    title: 'New Post'
  })
};

exports.create = function(req, res) {
  db.articles.save({
    author: req.param('author'), 
    content: req.param('content')
  }, 
    function(err, saved) {
      if (err || !saved) console.log("Post not saved");
      else res.redirect('/');
    }
  )
};

exports.show = function(req, res) {
  var id = req.params.id;
  db.articles.findOne({_id: db.ObjectId(id)}, function(err, article) {
    if (err) console.log("Could not find article with id of " + id);
    else {
      res.render('show', {
        title: article.title,
        article: article
      })
    }
  })
};