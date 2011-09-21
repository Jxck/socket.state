// Client
var log = function(){ console.log(arguments); };
var socket = io.connect('http://localhost');

socket.on('connect', function() {
  log('connected');
});

$(function(){
  $('a').bind('click', function(e) {
    var id = e.target.id;
    socket.emit('send id', id);
    history.pushState(id, id, id);
    return false;
  });

  socket.on('push data', function (data) {
    $('#area').text(data);
  });

  $(window).bind("popstate", function(e){
    var id = location.pathname.split('/').pop();
    if(id === '/') return false;
    socket.emit('send id', id);
  });
});