'use strict';

const express = require("express");
const jwt = require('jsonwebtoken');

const api    = require("./auth");
const apisf  = require("./apisf/oauth");
const apihcm = require("./apihcm/auth_controller");
const config = require("./config");

const router = express.Router();

function isTokenAuthenticate (req, res, next){
	
	var token = req.user.token;
	
	jwt.verify(token, config.secret, function(err, decoded) {
		if(!err){
			next();
		}else{
			res.redirect('/');
		}
	});
}

router.use('/hcm', isTokenAuthenticate, apihcm);
router.use('/sf', isTokenAuthenticate, apisf);

module.exports = router;