var express = require('express');
var app = express();

var port = '31280';

app.use(express.static(__dirname + '/public/'));
app.listen(port);

console.log('map source now running on http://localhost:' + port );
