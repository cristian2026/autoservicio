'use strict';

const querystring = require('querystring');
const request = require('request');
const fs = require('fs');

const ENV_COMPANY_ID = process.env.COMPANY_ID;
const ENV_API_KEY 	 = process.env.API_KEY;
const ENV_PRIVATE_KEY = process.env.PRIVATE_KEY;
const ENV_TOKEN_URL = "https://"+process.env.SFSF_DC+".sapsf.com/oauth/token".replace(/hcm|performancemanager/gi,'api');
const ENV_AUTH_URL = "https://"+process.env.SFSF_DC+".sapsf.com/oauth/idp".replace(/hcm|performancemanager/gi,'api');

function getTokenSSFF(p_user_id) {

	var post_data = querystring.stringify({
		'client_id' : ENV_API_KEY,
		'user_id': p_user_id,
		'token_url': ENV_TOKEN_URL,
		'private_key' : ENV_PRIVATE_KEY
	});

  	var options = {
		url: ENV_AUTH_URL,
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: post_data
	};

	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				
				var getToken = _getAssertionSSFF(body);
				
			  	getToken.then( function(result) {

			  		resolve(JSON.parse(result).access_token);
			  	})
			}
		}

		request.post(options, callback);
	})

}

function _getAssertionSSFF(p_body){
	var post_data = querystring.stringify({
	    	'company_id' : ENV_COMPANY_ID,
			'client_id' : ENV_API_KEY,
			'api_key': ENV_API_KEY,
			'grant_type': 'urn:ietf:params:oauth:grant-type:saml2-bearer',
			'assertion' : p_body
		});

	var options = {
			url: ENV_TOKEN_URL,
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: post_data
		};
		
	return new Promise(function(resolve, reject) {
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request.post(options, callback);
	})
	
}

// export the class
module.exports = getTokenSSFF;