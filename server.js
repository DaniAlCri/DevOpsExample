var express = require('express');
 var app = express();

 /*Cuando se reciba una petición dentro del directorio "/" (el raíz)
   Ejecutará el código dentro.*/
 app.get('/', function(req, res) {
     //Devuielve el archivo AddWebpage.html
     res.sendFile(__dirname+'/www/AddWebpage.html');
 });

 //Carga el directorio www
 app.use(express.static(__dirname + '/www'));

 /*Escucha en el puerto localhost:8081
    Crea una dirección y un puerto*/
 var server = app.listen(8081, function(req,res) {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
 });
