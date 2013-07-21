var express = require('express');
var app = express();
var path = require('path');
var request = require('request');

app.use(express.static(path.join(__dirname))); 

app.use(express.bodyParser());
 
app.get('/youtube/videos', function(req, res){
    request('https://gdata.youtube.com/feeds/api/videos?q='+req.query.query+'&max-re‌​sults=10&v=2&alt=jsonc&orderby=published&key=AIzaSyBab_zW5gNWV2oRAii4QrkfmWCPpk7PjY4', function (error, response, body) {
      if (!error && response.statusCode == 200) {
       res.send(body);
      }
    });

});

app.listen(8080);