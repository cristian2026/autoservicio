'use strict';
// refer: https://thinkster.io/tutorials/node-json-api/creating-the-user-model
const jwt = require('jsonwebtoken');

const apisf = require("./apisf/oauth");

const config = require('./config');

// json web token
function generateJWT (id) {

	return new Promise(function(resolve, reject) {
		// auth api sf
		apisf(id).then(
			function(sftoken) {
				
				resolve(
					jwt.sign(
						{	
							id: id,
							sftoken: sftoken,
							exp: config.jwtExpirate
						}, // 24 hrs
						config.secret
					)
				);	

		  	}
	  	);
		
	});
};

// auth
module.exports.toAuthToken = function(id){
	return new Promise(function(resolve, reject) {
		generateJWT(id).then(function (result){
			resolve({
				auth: true,
				token: result
			});
		});
	});
};

module.exports.isTokenAuthenticate = function(req, res){
		return new Promise(function(resolve, reject) {
				
			jwt.verify(req.user.token, config.secret, function(err, decoded) {
				if(!err){
					resolve(decoded);
				}else{
					res.redirect('/');
				}
			});

		});
	}