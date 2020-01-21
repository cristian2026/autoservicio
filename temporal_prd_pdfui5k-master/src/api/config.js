// ref: https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
// Disclaimer: Have in mind, under no circumstances should you ever, (EVER!) have your secret key publicly visible like this. Always put all of your keys in environment variables! I’m only writing it like this for demo purposes.

var today = new Date();
var exp = new Date(today);
exp.setDate(today.getDate() + 60);

module.exports = {
	secret: process.env.JWT_SECRET,
	jwtExpirate: Math.floor(Date.now() / 1000) + (((60 * 60) * 24) * 36000 )//parseInt(exp.getTime() / 1000)
}