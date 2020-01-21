'use strict';

const express = require("express");
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors')
const uuid = require('uuid/v4');
const fs = require('fs');
const helmet = require('helmet');
const favicon = require('serve-favicon');

const app = express();

const ENV_PORT       = process.env.PORT || 4000;
const ENV_DOMAIN     = process.env.DOMAIN;
const ENV_SFSF_DC    = process.env.SFSF_DC;
const ENV_COMPANY_ID = process.env.COMPANY_ID;

const SFSF = "https://"+ENV_SFSF_DC+".sapsf.com/sf/idp/SAML2/SSO/Redirect/company/"+ENV_COMPANY_ID

// local
const apiauth = require("./src/api/auth");
const api = require("./src/api/router");
const ui5 = require("./src/static/router");

// setea las fuentes de openui5
app.use('/resources', express.static('node_modules/openui5.runtime.downloader/lib/resources'));
app.use(favicon(__dirname + '/src/public/images/favicon.ico'));

app.use(cors());
// basic secure
app.use(helmet());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CookieParser
app.use(cookieParser());

var expiryDate = new Date(Date.now() + (60 * 1) * 1 * 1000); // 24 hour

app.use(session({
  genid: function(req) {
    return uuid(); // use UUIDs for session IDs
  },
  name:'sessionAs',
  secret: 'jpbarahonaphrwut',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true
  }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

var samlStrategy = new SamlStrategy(
  {
      callbackUrl: ENV_DOMAIN + "callback",
      entryPoint: SFSF,
      issuer: ENV_DOMAIN,
      logoutUrl: ENV_DOMAIN + "logout",
      logoutCallbackUrl: ENV_DOMAIN + "logout/callback"
   },
  function(profile, done) {
    console.log("Iniciando SAML para " + profile.nameID)
    var user = {};
    user.id = profile.nameID;
    return done(null, user);
  }
);

app.use(function (req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
});

passport.use(samlStrategy);

// serialize
passport.serializeUser(function(user, done) {
  console.log("serializeUser para " + user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser para " + id)
  // Create token
  apiauth.toAuthToken(id).then(function(result){
    return done(null, result);
  })
});

app.post('/callback',
  passport.authenticate('saml', {failureRedirect:'/login/fail'}),
  function(req, res, next) { 
    if ( String(req.user.id).match(/^\d*$/g) ){
      res.status(200);
      res.redirect('/u');
    }else{
      res.status(200);
      res.send("No utilizar usuario " + req.user.id);
    }
  });

app.get('/',
  passport.authenticate('saml', {failureRedirect:'/login/fail'}),
  function(req, res) {
    res.status(200).send("Autoservicio running...");
  });

app.get('/login/fail', 
  function(req, res) {
    res.status(401).send('Login failed');
  }
);

app.get('/logout',
  passport.authenticate('saml', {failureRedirect:'/login/fail'}),
  function(req, res) {
    res.status(200).send("Autoservicio logout...");
  });

app.post('/logout/callback',
  passport.authenticate('saml', {failureRedirect:'/failed'}),
  function(req, res, next) { 
    req.logout();
    res.redirect('/');
    // if ( String(req.user.id).match(/^\d*$/g) ){
    //   req.session.destroy(function(err) {
    //     res.status(200);
    //     res.send('logout');
    //   })
    // }
  });

function isAuthenticate(req, res, next){
  if(req.isAuthenticated()) {
    res.status(200);
    next();
  } else {
    res.status(200).redirect('/');  
  }
}

app.use('/api', isAuthenticate, api);
app.use('/u', isAuthenticate, ui5);

// app.get('*', function(req, res){
//   res.status(404);
//   res.redirect('/u');
// });

app.listen(ENV_PORT, function(){
  console.log("Server work on port " + ENV_PORT);
});