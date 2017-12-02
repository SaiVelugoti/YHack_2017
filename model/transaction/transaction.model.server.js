var mongoose = require("mongoose");
var transactionSchema = require("./transaction.schema.server");

var transactionModel = mongoose.model("transactionModel", transactionSchema);

transactionModel.addTransactions = addTransactions;
transactionModel.getTransactions = getTransactions;

module.exports = userModel;


function addTransactions(itemId,transactions) {
    return transactionModel.findById(itemId)
        .then(function (item) {
            forEach(t in transactions)
                item.transactions.push(t);
            return item.save();
        });
}

function getTransactions(itemId) {
    return transactionModel.findById(itemId)
        .then(function (item) {
            return item.transactions;
        });
}