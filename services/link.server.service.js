var app = require("../express");
var moment = require('moment');
var userModel = require('../model/user/user.model.server');
var transactionModel = require('../model/transaction/transaction.model.server');

const plaid = require('plaid');
const keys = require("../keys");
var access_token = "";
const public_token = null;

const client_id=process.env.CLIENT_ID || keys.client_id;
const secret=process.env.SECRET || keys.secret;
const public_key=process.env.PUBLIC_KEY || keys.public_key;

const plaidClient = new plaid.Client(client_id, secret, public_key, plaid.environments.sandbox);

app.put('/api/link', getAccounts);
app.get('/api/transactions', getTransactions);
app.get('/api/overallexpenses', findOverAllAvgExpenses);
app.get('/api/singleexpense', findSingleAvgExpenses);
// app.put('/api/linkPlaid', getAccountsFromPlaid);

// function getAccounts(req, res) {
//     var t = req.query["public_token"];
//     var useremail = req.query["useremail"];
//     var accessToken;
//     plaidClient.exchangePublicToken(t).then(rsp1 => {
//         accessToken = rsp1.access_token;
//         return userModel.updateUser(useremail, accessToken)
//             .then(function (resp) {
//                 transactionModel.addTransactions(useremail, transactions)
//                     .then(function (respTrans) {
//                         respTrans.sendStatus(200);
//                     }, function (err) {
//                         respTrans.sendStatus(500);
//                     });
//             }, function (err) {
//                 res.sendStatus(500);
//             });
//     }).catch(err => {
//         throw new Error(`Unreachable code block for example: ${err}`);
//     });
// }

var transactions = [
    {
        account_id: '5vjAQJRgGnu9wzxwBNjKImDQVPwlz4HzMqglL',
        account_owner: null,
        amount: 25,
        category: ['Payment', 'Credit Card'],
        category_id: '16001000',
        date: '2017-11-27',
        location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null
        },
        name: 'CREDIT CARD 3333 PAYMENT *//',
        payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null
        },
        pending: false,
        pending_transaction_id: null,
        transaction_id: '3yNE7LopwnSbwgvw57pWidaojDj9JxIGzrrDG',
        transaction_type: 'special'
    },
    {
        account_id: 'JMmjrQ65RwsbdLXd7kaQiBJL97ybzEUpqVZ3W',
        account_owner: null,
        amount: 1000,
        category: ['Transfer', 'Deposit'],
        category_id: '21007000',
        date: '2017-11-26',
        location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: null,
            zip: null
        },
        name: 'CD DEPOSIT .INITIAL.',
        payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null
        },
        pending: false,
        pending_transaction_id: null,
        transaction_id: 'xAJ8eRy7wDfWor1obdkAIQ5EdGd8nBim87739',
        transaction_type: 'special'
    },
    {
        account_id: 'wWok7xwj9Ru3p9Npnj84S6J3ZGNr8AsAjBLwK',
        account_owner: null,
        amount: 12,
        category: ['Food and Drink', 'Restaurants', 'Fast Food'],
        category_id: '13005032',
        date: '2017-11-24',
        location: {
            address: null,
            city: null,
            lat: null,
            lon: null,
            state: null,
            store_number: '3322',
            zip: null
        },
        name: 'McDonald\'s',
        payment_meta: {
            by_order_of: null,
            payee: null,
            payer: null,
            payment_method: null,
            payment_processor: null,
            ppd_id: null,
            reason: null,
            reference_number: null
        },
        pending: false,
        pending_transaction_id: null,
        transaction_id: 'qLQZdqMxpJfpeBkegMlzcqMjbQbgEZi8nmmzW',
        transaction_type: 'place'
    }

];

function getAccounts(req, res) {
    var t = req.query["public_token"];
    var useremail = req.query["useremail"];
    var accessToken;
    plaidClient.exchangePublicToken(t).then(rsp1 => {
        accessToken = rsp1.access_token;
        const now = moment();
        const today = now.format('YYYY-MM-DD');
        const thirtyDaysAgo = now.subtract(365, 'days').format('YYYY-MM-DD');
        plaidClient.getTransactions(accessToken, thirtyDaysAgo, today)
            .then(respPlaid => {
                //console.log(respPlaid.transactions);
                transactionModel.addTransactions(useremail, respPlaid.transactions);
            }).catch(err => {
            console.log(err);
            //throw new Error(`Unreachable code block for example: ${err}`);
        });
        res.sendStatus(200);
    }, function (err) {
        res.sendStatus(500);
    }).catch(err => {
        // throw new Error(`Unreachable code block for example: ${err}`);
    });
}
function getTransactions(req, res) {
    var useremail = req.query["useremail"];
   return transactionModel.getTransactions(useremail)
        .then(function (transactionsRetrieved) {
            res.json(transactionsRetrieved);
        });
}

function findOverAllAvgExpenses(req, res) {
    return transactionModel.findOverAllAvgExpenses()
        .then(function (overallavg) {
            res.json(overallavg);
        });
}

function findSingleAvgExpenses(req, res) {
    var email=req.query["useremail"];
    return transactionModel.findSingleAvgExpenses(email)
        .then(function (singleavg) {
            res.json(singleavg);
        });
}