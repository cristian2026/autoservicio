'use strict';

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const api = require("../auth");
//var apihcm = require("./auth");
const apiSF = require("./auth");

router.get('/liqsueldo/:year/:month', function(req, res){
	
	var year = req.params.year;
	var month = req.params.month;

	//console.log(year+month);

	api.isTokenAuthenticate(req, res).then(function(api_result){

		res.setHeader('Content-disposition', 'inline; filename="prueba.pdf"');
	  	res.setHeader('Content-type', 'application/pdf');

		apihcm.getLiquidacionSueldo('30000695').then(
			function(result) {
				res.status(200).send(result);
		});	

	});

})


// router.get('/resuelveUserid', function(req, res){
	

// 	apiSF.isTokenAuthenticate(req, res).then(function(api_result){

// 		apiSF.getUserid(api_result.id, api_result.sftoken).then(function(result){
// 			console.log(result);
// 		});


// 	});

// })

module.exports = router;