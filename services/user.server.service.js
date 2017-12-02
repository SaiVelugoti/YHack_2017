var app = require("../express");
var userModel = require("../model/user/user.model.server");

app.get('/api/login', login);

function login(req, res) {
    userModel.findUserByCredentials(req.query["useremail"],req.query["password"])
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.json(null);
        });
    console.log(req.query["useremail"], req.query["password"]);
}
