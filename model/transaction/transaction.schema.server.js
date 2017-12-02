var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema(
    {
        itemId : {type : String, unique : true},
        transactions : [{type : String}]
    }, {collection : 'transaction'}

);

module.exports = transactionSchema;
