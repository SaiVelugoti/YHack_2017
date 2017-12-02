/**
 * Created by Palaparthi on 11/18/17.
 */

var app = require('./express');

require("./app");

//var passport      = require('passport');
//var cookieParser  = require('cookie-parser');
//var session       = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

//app.use(session({
//    secret: /*process.env.SESSION_SECRET*/ 'secret123'
//}));
//app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());

// require ("./test/app.js")(app);

var port = process.env.PORT || 3300;

//require("./public/app");
app.listen(port);