var fs = require('fs');
var gm = require('gm');
var request = require('request');

Images = (function() {
	Images.prototype.invert = function(url, cb) {
		options = {
			uri: url,
			encoding: 'binary'
		};
		request(options, function(err, response, body) {
			if ((err != null) || response.statusCode !== 200) {
				return cb(err);
			}
			var buffer = new Buffer(body, 'binary');
			gm(buffer, 'tweet.jpg').negative().resize(500, 500).toBuffer(cb)
		});
	};
});

module.exports = new Images();