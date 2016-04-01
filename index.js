require('dotenv').config();
//handles certificate issue: [Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE]
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var twitter = require('./Twitter');
var images = require('./Images')


var url = 'https://s-media-cache-ak0.pinimg.com/564x/ca/94/7f/ca947f2fc5541a3171fd2fd124ac09dc.jpg'

images.invert(url, function(err, buffer){
  if (err){
    console.log(err)
  } else {
    twitter.tweetMediaBuffer('', buffer, console.log)
  }
});




