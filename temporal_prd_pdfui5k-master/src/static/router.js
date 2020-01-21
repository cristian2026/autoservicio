'use strict';

const express = require("express");

const router = express.Router();

router.use('/', express.static('./src/static'));
router.use('/BoletaPago', express.static('./src/static/BoletaPago'));
router.use('/CertAntiguedad', express.static('./src/static/CertAntiguedad'));
router.use('/CertSII', express.static('./src/static/CertSII'));
router.use('/CertCTS', express.static('./src/static/CertCTS'));
router.use('/CertPrestamos', express.static('./src/static/CertPrestamos'));

module.exports = router;