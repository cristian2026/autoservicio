'use strict';

const express = require("express");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();

const api = require("../auth");
const apisf_model = require("../apisf/model");
const apihcm = require("./auth");


router.get('/liqsueldo/:annio/:mes', function(req, res){
	
	var annio = req.params.annio;
	var mes = req.params.mes;

	api.isTokenAuthenticate(req, res).then(function(api_result){

		res.setHeader('Content-disposition', 'inline; filename="LIQUIDO_SUELDO_'+api_result.id+'_'+annio+'_'+mes+'.pdf"');
	  	res.setHeader('Content-type', 'application/pdf');

	  	apihcm.getLiquidacionSueldo(api_result.id,annio,mes).then(
				function(result) {
					res.send(new Buffer(result, 'binary'));
			});	

	});

})

router.get('/certPrestamos/:annio/:mes', function(req, res){
	
	var annio = req.params.annio;
	var mes = req.params.mes;

	api.isTokenAuthenticate(req, res).then(function(api_result){

		res.setHeader('Content-disposition', 'inline; filename="CERTIFICADO_PRESTAMO_'+annio+'_'+mes+'.pdf"');
	  	res.setHeader('Content-type', 'application/pdf');

	  	apihcm.getCertPrestamos(api_result.id,annio,mes).then(
			function(result) {
				res.send(new Buffer(result, 'binary'));
		});

	});

})

router.get('/certPrestamosPeru/:annio/:mes', function(req, res){
	
	var annio = req.params.annio;
	var mes = req.params.mes;

	api.isTokenAuthenticate(req, res).then(function(api_result){

	

	  	apihcm.getCertPrestamosPeru(api_result.id,annio,mes).then(
			function(result) {


				res.setHeader('Content-disposition', 'inline; filename="CERTIFICADO_PRESTAMOS_PERU'+annio+'_'+mes+'.pdf"');
			  	res.setHeader('Content-type', 'application/pdf; charset=ISO-8859-1');

			    

			    //res.status(200).send(result);
			    res.send(new Buffer(result, 'binary'));



		});

	});

})

router.get('/certUtilidadesPeru/:annio/:mes', function(req, res){
	
	var annio = req.params.annio;
	var mes = req.params.mes;

	api.isTokenAuthenticate(req, res).then(function(api_result){

	

	  	apihcm.getCertUtilidadesPeru(api_result.id,annio,mes).then(
			function(result) {


				res.setHeader('Content-disposition', 'inline; filename="CERTIFICADO_UTILIDADES_PERU'+annio+'_'+mes+'.pdf"');
			  	res.setHeader('Content-type', 'application/pdf; charset=ISO-8859-1');

			    

			    //res.status(200).send(result);
			    res.send(new Buffer(result, 'binary'));



		});

	});

})

router.get('/certCTS/:annio/:mes', function(req, res){
	
	var annio = req.params.annio;
	var mes = req.params.mes;


	api.isTokenAuthenticate(req, res).then(function(api_result){

		res.setHeader('Content-disposition', 'inline; filename="CERTIFICADO_CTS.pdf"');
	  	res.setHeader('Content-type', 'application/pdf');

	  	apihcm.getCertificadoCTS(api_result.id, annio, mes).then(
			function(result) {
				res.send(new Buffer(result, 'binary'));
		});

	});

})


router.get('/certSII/:begda/:endda', function(req, res){

	var begda = req.params.begda;
	var endda = req.params.endda;

	api.isTokenAuthenticate(req, res).then(function(api_result){

		res.setHeader('Content-disposition', 'inline; filename="CERTIFICADO_SII.pdf"');
	  	res.setHeader('Content-type', 'application/pdf');
	  	
	  	apihcm.getCertificadoSII(api_result.id, begda, endda).then(
			function(result) {
				res.send(new Buffer(result, 'binary'));
		});	

	});

})


router.get('/certAntiguedad/:tipocert', function(req, res){

	var tipoCert = req.params.tipocert;
	

	api.isTokenAuthenticate(req, res).then(function(api_result){

		res.setHeader('Content-disposition', 'inline; filename="CERTIFICADO_ANTIGUEDAD.pdf"');
	  	res.setHeader('Content-type', 'application/pdf');

	  	apihcm.getCertificadoAntiguedad(api_result.id, tipoCert).then(
			function(result) {
				res.send(new Buffer(result, 'binary'));
		});

	});

})


router.get('/periodos', function(req, res){
	
	api.isTokenAuthenticate(req, res).then(function(api_result){

	  	// res.setHeader('Content-type', 'application/json');

	  	apihcm.getPeriodos(api_result.id).then(
			function(result) {
				res.status(200).send(result);
		});	

	});

})

router.get('/periodosPE', function(req, res){
	
	api.isTokenAuthenticate(req, res).then(function(api_result){

	  	// res.setHeader('Content-type', 'application/json');

	  	apihcm.getPeriodosPE(api_result.id).then(
			function(result) {
				res.status(200).send(result);
		});	

	});

})

router.get('/periodosCTS', function(req, res){
	
	api.isTokenAuthenticate(req, res).then(function(api_result){

	  	// res.setHeader('Content-type', 'application/json');

	  	apihcm.getPeriodosCTS(api_result.id).then(
			function(result) {
				res.status(200).send(result);
		});	

	});

})

router.get('/empleado', function(req, res){

	api.isTokenAuthenticate(req, res).then(function(api_result){

	  	// res.setHeader('Content-type', 'application/json');

	  	apihcm.getEmpleado(api_result.id).then(
			function(result) {
				res.status(200).send(result);
		});	

	});
});

router.get('/certQuinta/:annio', function(req, res){

	var annio = req.params.annio;
	
	api.isTokenAuthenticate(req, res).then(function(api_result){

	  	res.setHeader('Content-disposition', 'inline; filename="CERTIFICADO_QUINTA_'+api_result.id+'_'+annio+'.pdf"');
	  	res.setHeader('Content-type', 'application/pdf');

	  	apihcm.getCertificadoQuinta(api_result.id, annio).then(
			function(result) {
				res.status(200).send(new Buffer(result, 'binary'));
		});	

	});
});

module.exports = router;