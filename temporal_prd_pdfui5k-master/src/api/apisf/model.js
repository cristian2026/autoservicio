'use strict';

const querystring = require('querystring');
const request = require('request');
const fs = require('fs');

var OModel = {
	getPernr: function(username, p_token) {
	  	var options = {
			url: "https://api19preview.sapsf.com/odata/v2/PerPerson('"+username+"')?$format=json",
			headers: {
				"Authorization" : "Bearer " + p_token
			}
		};

		return new Promise(function(resolve, reject) {
			function callback(error, response, body) {
				if (!error && response.statusCode == 200) {
					// resolve(JSON.parse(body).d);
					resolve(JSON.parse(body).d.personIdExternal);
				}
			}

			request(options, callback);
		})

	},

	getUserid: function(username, p_token) {
	  	var options = {
			
			url: "https://api19preview.sapsf.com/odata/v2/User?$filter=username eq '" + username.toUpperCase() + "'&$format=json",
			//url: "https://api19preview.sapsf.com/odata/v2/User('"+username+"')$format=json?",
			headers: {
				"Authorization" : "Bearer " + p_token
			}
		};

		return new Promise(function(resolve, reject) {
			function callback(error, response, body) {
				if (!error && response.statusCode == 200) {
					// resolve(JSON.parse(body).d);
					console.log("userid: "+ JSON.parse(body).d.results[0].userId) ;
					//console.log(JSON.parse(body).d.results[0].userId)
					resolve(JSON.parse(body).d.results[0].userId);
				}
			}

			request(options, callback);
		})

	}

}

// export the class
module.exports = OModel;