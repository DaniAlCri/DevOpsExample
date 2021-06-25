var express = require('express');
 var app = express();
 app.get('/', function(req, res) {
     res.sendFile(__dirname+'/www/AddWebpage.html');
 });

 /*app.get('/AddWebpage.html', function(req,res){
  res.app('/AddScript.js');
 });*/

 app.use(express.static(__dirname + '/www'));

 //app.listen(8081);
 var server = app.listen(8081, function(req,res) {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
 });
