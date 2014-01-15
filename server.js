var express = require('express');
var engine = require('ejs-locals');
var app = express();

var connectUrl = process.env.GOINSTANT_CONNECT_URL || 'https://goinstant.net/mattcreager/DingDong';
var port = process.env.PORT || 5000;

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { GOINSTANT_CONNECT_URL: connectUrl  });
});

app.listen(port);

console.log('Chat example application running on port:', port);