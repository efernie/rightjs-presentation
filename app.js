
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('*', function(req, res, next) {
    var url = req.url,
        ua = req.headers['user-agent'];

    if (url.match(/(^|\/)\./)) {
      res.end("Not allowed");
    }

    if (ua && ua.indexOf('MSIE') && /htm?l$/.test(url)) {
      res.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

    if (/^www\./.test(url)) {
      res.statusCode = 302;
      res.setHeader('Location', url.replace(/^www\./, ''));
      res.end();
    }

    next();
  });

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
