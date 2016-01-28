require('dotenv').config();

var twitter = require('./Twitter');
var images = require('./Images')

// var url = 'http://cdn1-www.cattime.com/assets/uploads/gallery/25-cat-memes/Cat-meme_004.jpg'
var url = 'http://www.becauseimacat.com/wp-content/uploads/2015/08/cat-memes7.jpg'

images.invert(url, function(err, buffer){
  if (err){
    console.log(err)
  } else {
    twitter.tweetMediaBuffer('', buffer, console.log)
  }
});

// console.log(twitter)
// twitter.tweetMedia('Dis Cat', url, console.log)
// twitter.tweet('Wakaka', console.log)
// var http = require('http');

// var server = http.createServer(function(req, res) {


//   gm('qt.png').negative()
//   .write('reqt.png', function (err) {
//   if (!err) console.log('done');
//   });
//   var img = fs.readFileSync('reqt.png');
//       res.writeHead(200, {'Content-Type': 'image/gif' });
//       res.end(img, 'binary');

// });
// server.listen(8080);



  // gm convert -negate test.png out.png