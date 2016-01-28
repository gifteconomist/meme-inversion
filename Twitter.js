var request, Tr, Twitter;

request = require ('request');
Tr = require('twitter');
 
var client = new Tr({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_KEY_SECRET
});

Twitter = (function() {
		Twitter.prototype.tweet = function(status, options, cb) {
		var url, params;
		if (typeof options === 'function') {
					cb = options;
					options = {};
				}
		url = 'statuses/update';
		params = {
			status: status
		};
		for (key in options) {
					value = options[key];
					params[key] = value;
				}
		return client.post(url, params, cb);
	};

	Twitter.prototype.uploadMediaUrl = function(mediaUrl, cb) {
		var options, url;
		url = 'media/upload';
		options = {
			uri: mediaUrl,
			encoding: 'binary'
		};
		return request(options, (function(_this) {
			return function(err, response, body) {
				var params;
				if ((err != null) || response.statusCode !== 200) {
							return cb(err);
							}
				body = new Buffer(body, 'binary');
				params = {
					media: body
				};
				return client.post(url, params, cb);
			};
		}) (this));
	};
	Twitter.prototype.uploadMediaBuffer = function(buffer, cb) {
		var url = 'media/upload';
		params = {
			media: buffer
		};
		return client.post(url, params, cb);
	};

	Twitter.prototype.tweetMediaBuffer = function(status, buffer, cb) {
		return this.uploadMediaBuffer(buffer, (function(_this) {
			return function(err, info) {
				var mediaId, options;
				if (err != null) {
								return cb(err);
							}
				mediaId = info['media_id_string'];
				options = {
					media_ids: mediaId
				};
				return _this.tweet(status, options, function(err, result) {
					var data;
					if (err != null) {
										return cb(err);
								}
					data = {
						mediaId: mediaId,
						tweetId: result['id_str'],
						text: result['text'],
					};
					return cb(null, data);
				});
			};
		})(this));
	};

	Twitter.prototype.tweetMedia = function(status, mediaUrl, cb) {
		return this.uploadMediaUrl(mediaUrl, (function(_this) {
			return function(err, info) {
				var mediaId, options;
				if (err != null) {
								return cb(err);
							}
				mediaId = info['media_id_string'];
				options = {
					media_ids: mediaId
				};
				return _this.tweet(status, options, function(err, result) {
					var data;
					if (err != null) {
										return cb(err);
								}
					data = {
						mediaId: mediaId,
						tweetId: result['id_str'],
						text: result['text'],
					};
					return cb(null, data);
				});
			};
		})(this));
	};

});

module.exports = new Twitter();

