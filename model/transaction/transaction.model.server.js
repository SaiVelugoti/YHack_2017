var mongoose = require("mongoose");
var transactionSchema = require("./transaction.schema.server");

var transactionModel = mongoose.model("transactionModel", transactionSchema);

transactionModel.addTransactions = addTransactions;
transactionModel.getTransactions = getTransactions;
transactionModel.findTransactionIdsByEmail = findTransactionIdsByEmail;
transactionModel.findOverAllAvgExpenses = findOverAllAvgExpenses;
transactionModel.findSingleAvgExpenses = findSingleAvgExpenses;

module.exports = transactionModel;
//
// function addTransactions(useremail, newTransactions) {
//    for(var i=0; i< newTransactions.length; i++) {
//        createTransaction(useremail, newTransactions[i]);
//    }
// }

function createTransaction(email, t) {
    if (t.category !== null) {
        var transaction = {
            _useremail: email,
            transactionId: t.transaction_id,
            category_main: t.category[0],
            category_sub: t.category[1],
            place_of_purchase: t.name,
            amount: t.amount,
            date_of_transaction: t.date
        }
        transactionModel.create(transaction);
    }
}

function findTransactionIdsByEmail(useremail) {
    transactionModel.find({_useremail: useremail}, {transactionId: 1, _id: 0});
}

function getTransactions(useremail) {
    return transactionModel.findById(itemId)
        .then(function (item) {
            return item.transactions;
        });
}

function addTransactions(useremail, newTransactions) {
    var existingTransactionIds = transactionModel.findTransactionIdsByEmail(useremail);
    if (existingTransactionIds) {
        console.log(typeof existingTransactionIds);
        for (var i=0; i<newTransactions.length; i++)
        {
            if (existingTransactionIds.indexOf(newTransactions[0].transactionId) > -1) {
                createTransaction(useremail, t);
            }
        }
    }
    else {
        for (var i = 0; i < newTransactions.length; i++) {
            createTransaction(useremail, newTransactions[i]);
        }
    }
}
function findOverAllAvgExpenses() {
    return transactionModel.aggregate(
        [{$group: {_id: "$category_main", AvgAll: { $avg: '$amount'}}}])
        .then(function (res) {
            return res;
        });
        /*function (err, result) {
            if(err){
                console.error(err);
            } else {
                return result.json();
            }
        }
    )*/
}

function findSingleAvgExpenses(user_email) {
    return transactionModel.aggregate(
        [{$match: {_useremail: user_email}},
            {$group: {_id: "$category_main",
                AvgOne: { $avg: '$amount'}}}])
        .then(function (res) {
            return res;
        });
        /*function (err, result) {
            if(err){
                console.error(err);
            } else {
                return result;
            }
        }
    )*/
}