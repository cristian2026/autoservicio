'use strict';

const querystring = require("querystring");
const request = require("request");
const fs = require("fs");

// env
const username = process.env.GW_USER;
const password = process.env.GW_PASSWORD;
const gw_url   = process.env.GW_URL;

var options = {
	    encoding: "binary",
		headers: {
			"Content-type" : "application/pdf",
			"Authorization" : "Basic " + new Buffer(username + ":" + password).toString("base64")
		}
	};

function getCertificadoCTS(p_pernr, p_annio, p_mes){
	options.url = gw_url + "certCTSCollection(Pernr='" + p_pernr + "',Pabrp='"+p_mes+"',Pabrj='"+p_annio+"')/$value";
  	console.log(options.url);
	
	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});
}


function getCertificadoSII(p_pernr, begda, endda){
	options.url = gw_url + "certSIICollection(Pernr='"+p_pernr+"',Begda=datetime'"+begda+"T00%3A00%3A00',Endda=datetime'"+endda+"T00%3A00%3A00')/$value";
	console.log(options.url);

	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});
}

function getCertificadoAntiguedad(p_pernr, p_tipocert){
	options.url = gw_url + "certAntiguedadRentaCollection(Employeenumber='" + p_pernr + "',TipoCert='"+p_tipocert+"')/$value";
	console.log(options.url);

	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});
}

function getLiquidacionSueldo(p_pernr, p_annio, p_mes) {
	options.url = gw_url + "boletaPagoCollection(Pernr='" + p_pernr + "',Pabrp='"+p_mes+"',Pabrj='"+p_annio+"')/$value";
	console.log(options.url);

	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}


function getCertPrestamos(p_pernr, p_annio, p_mes) {
	p_mes = new Date().getMonth();
	p_annio = new Date().getFullYear();

  	options.url = gw_url + "certPrestamosCollection(Pernr='" + p_pernr + "',Pabrp='"+p_mes+"',Pabrj='"+p_annio+"')/$value";
  	console.log(options.url);

	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getCertPrestamosPeru(p_pernr, p_annio, p_mes) {
  	options.url = gw_url + "certPrestamosPECollection(Pernr='" + p_pernr + "',Pabrp='"+p_mes+"',Pabrj='"+p_annio+"')/$value";
  	console.log(options.url);

	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getCertUtilidadesPeru(p_pernr, p_annio, p_mes) {
  	options.url = gw_url + "certUtilidadesPECollection(Pernr='" + p_pernr + "',Pabrp='"+p_mes+"',Pabrj='"+p_annio+"')/$value";
  	console.log(options.url);

	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getPeriodos(p_pernr) {

	options.url = gw_url + "periodosCollection?$filter=(Pernr%20eq%20%27"+ p_pernr +"%27)&$format=json";
	console.log(options.url);
	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getPeriodosPE(p_pernr) {

	options.url = gw_url + "periodosPECollection?$filter=(Pernr%20eq%20%27"+ p_pernr +"%27)&$format=json";
	console.log(options.url);
	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getPeriodosCTS(p_pernr) {

	options.url = gw_url + "periodosCTSCollection?$filter=(Pernr%20eq%20%27"+ p_pernr +"%27)&$format=json";
	console.log(options.url);
	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getEmpleado(p_pernr) {
	options.url = gw_url + "empleadosCollection?$filter=(Pernr%20eq%20%27"+ p_pernr +"%27)&$format=json";
	console.log(options.url);
	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getEmpleadoCR(p_pernr) {
	options.url = gw_url + "periodosCR?$filter=(Pernr%20eq%20%27"+ p_pernr +"%27)&$format=json";
	console.log(options.url);
	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});

}

function getCertificadoQuinta(p_pernr, p_annio){
	options.url = gw_url + "certQuintaSet(Pernr='" + p_pernr + "',Begda=datetime'"+p_annio+"-01-01T00%3A00%3A00',Endda=datetime'"+p_annio+"-12-31T00%3A00%3A00')/$value";
  	console.log(options.url);
	
	return new Promise(function(resolve, reject) {
			
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			}
		}

		request(options, callback);
	});
}

module.exports.getPeriodosCTS = getPeriodosCTS;
module.exports.getPeriodosPE = getPeriodosPE;
module.exports.getCertUtilidadesPeru = getCertUtilidadesPeru;
module.exports.getEmpleado = getEmpleado;
module.exports.getCertPrestamosPeru = getCertPrestamosPeru;
module.exports.getCertPrestamos = getCertPrestamos;
module.exports.getCertificadoCTS = getCertificadoCTS;
module.exports.getCertificadoSII = getCertificadoSII;
module.exports.getCertificadoAntiguedad = getCertificadoAntiguedad;
module.exports.getPeriodos = getPeriodos;
module.exports.getLiquidacionSueldo = getLiquidacionSueldo;
module.exports.getCertificadoQuinta = getCertificadoQuinta;