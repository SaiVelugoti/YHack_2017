var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;

module.exports = userModel;


function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(useremail,password) {
    return userModel.findOne({useremail:useremail,password:password});
}

function updateUser(useremail, access_token) {
    return userModel.update({useremail:useremail}, {$addToSet: {accessTokens:access_token}});
}