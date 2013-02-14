
/*
 * GET home page.
 */

var db = require('../modules/db.js').db

exports.index = function(req, res){
  db.articles.find(function (err, articles) {
    if (err) console.log("error!");
    else {
      res.render('index', 
      { title: 'nodejs blog with twitter bootstrap, mongodb, and express',
        articles: articles })
    }
  })
};

exports.about = function(req, res){
  res.render('about', { title: 'About'})
};