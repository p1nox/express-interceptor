var express = require('express');
var app     = express();

var interceptor = require('../index');

app.use(interceptor(function(req, res){
  return {
    initerceptPredicate: function(){
      return true;
    },
    send: function(body, done) {
      var body2 = body.replace('</body>','<script>alert("you were intercepted!")</script></body>');
      done(null, body2);
    }
  };
}));

app.set('views', './examples/static');
app.set('view engine', 'jade');

app.get('/:docId', function(req, res){
  res.render(req.params.docId);
});

module.exports = app;
