var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema(
    {
        _useremail: String,
        transactionId: String,
        category_main: String,
        category_sub: {type: String, default: null},
        place_of_purchase: String,
        amount: Number,
        date_of_transaction: {type: Date, default: Date.now}
    }, {collection : 'transaction'});

module.exports = transactionSchema;
