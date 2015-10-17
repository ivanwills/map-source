var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/'));
app.listen(8888);

console.log('Map Blaster running on http://localhost:8888');
