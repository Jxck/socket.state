// Client
var log = function(){ console.log(arguments); };
// Client
// var socket = io.connect('http://localhost');

// socket.on('connect', function() {
//   log('connected');
//   socket.emit('msg send', 'data');
//   socket.on('msg push', function (msg) {
//     log(msg);
//   });
// });

$(function(){
  $('a').bind('click', function(e) {
    var id = e.target.id;
    $('#area').load('/' + id);
    history.pushState(id, id, id);
    return false;
  });

  $(window).bind("popstate", function(e){
    var id = location.pathname;
    log(id);
    if(id === '/') return false;
    $('#area').load(id);
  });
});