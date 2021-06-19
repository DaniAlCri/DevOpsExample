const express = require("express");
const app = express();
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/AddWebpage.html");
});
app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});