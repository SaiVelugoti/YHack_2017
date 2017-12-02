var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        useremail : {type : String, unique : true},
        password : {type: String},
        firstName : {type: String, default:null},
        lastName : {type: String, default:null},
        itemIds: [{type : String}],
        accessTokens : [{type : String}]
    }, {collection : 'user'}

);

module.exports = userSchema;
