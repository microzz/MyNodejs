var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio')

app.get('/', function(req, res){
  request('http://www.microzz.com/it/', function (err, response, body) {
    if (!err && response.statusCode == 200) {
      $ = cheerio.load(body);
      var articleList = $('.articleList .articleTitle');
      var content = '';
        articleList.each(function (index, element) {
            content += $(element).text() + '<br>';
        })
      res.send(content);
    }
  })
});

app.listen(3000);
