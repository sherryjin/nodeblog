
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'nodejs blog with twitter bootstrap, mongodb, and express' })
};