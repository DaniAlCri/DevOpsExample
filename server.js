var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
  res.sendFile(AddWebpage.html);
  res.end();
});
server.listen(8080);