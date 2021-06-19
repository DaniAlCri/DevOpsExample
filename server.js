//Source: https://freshman.tech/learn-node/

const express = require("express");
const app = express();

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

  app.get('/home/dalvac01/Addwebsite', (req, res) => {
    res.sendFile(__dirname + "/AddWebpage.html");
  });
  app.listen(3000, function () {
      console.log("Server is running on localhost3000");
  });
  


