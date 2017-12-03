var app = require("../express");
var userModel = require("../model/user/user.model.server");

app.get('/api/login', login);
app.post('/api/register', register);

function login(req, res) {
    userModel.findUserByCredentials(req.query["useremail"],req.query["password"])
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.json(null);
        });
    console.log(req.query["useremail"], req.query["password"]);
}

function register(req, res) {
    var user = {
        useremail : req.query["useremail"],
        password : req.query["password"],
        firstName : req.query["firstname"],
        lastName : req.query["lastname"]
    };
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.json(null);
        });
    //console.log(req.query["useremail"], req.query["password"]);
}
