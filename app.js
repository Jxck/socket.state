
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer()
  , io = require('socket.io').listen(app)
  ;

var log = console.log;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
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

app.get('/:id', function(req, res){
  var id = req.params.id;
  res.send(id);
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {
  socket.on('send id', function (id) {
    socket.emit('push data', id);
    socket.broadcast.emit('push data', id);
  });
  socket.on('disconnect', function() {
    log('disconnected');
  });
});
