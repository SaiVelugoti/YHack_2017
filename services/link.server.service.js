var app = require("../express");
var moment = require("moment");
const plaid = require('plaid');
const keys = require("../keys");

const public_token = null;

const plaidClient = new plaid.Client(keys.client_id, keys.secret, keys.public_key, plaid.environments.sandbox);

app.get('/api/link', getAccounts);

function getAccounts(req, res) {
    var t = req.query["public_token"];
    //console.log("Hello -> link server");
    //console.log(req.body);
    console.log("categories");

    plaidClient.exchangePublicToken(t).then(rsp1 => {
        console.log(rsp1.access_token);
        // return res.json(rsp1.access_token);
        var accessToken = rsp1.access_token;
        console.log("---");

        // // --- Get Accounts
        // plaidClient.getAccounts(accessToken, function(err, res) {
        //     console.log(res.accounts);
        // });



        // ----- Get Categories
        plaidClient.getCategories().then(rs => {
            "use strict";
            var cat = rs.categories;
            var categories_Main = cat.filter(x => (parseInt(x.category_id)%1000000 == 0)); // 13
            var categories_second_level = cat.filter(x => (parseInt(x.category_id)%1000 == 0)); // 261

            console.log(categories_Main);
            console.log(categories_second_level);
            // console.log(cat[1]);
            // console.log(categories_second_level);

        })

        // --- Get Transactions
        const now = moment();
        const today = now.format('YYYY-MM-DD');
        const startDate = now.subtract(3650, 'days').format('' +
            '' +
            'YYYY-MM-DD');

        plaidClient.getTransactions(accessToken, startDate, today, (err, res) => {
            // console.log("Transactions successful");
            console.log('Transaction count-> '+ res.transactions.length);
            // console.log(res.transactions[0]);
            var tr = res.transactions;
            // var transac = tr.filter(x => (Math.floor(parseInt(x.category_id)/1000000) == 13)); // 13
            var transac = tr.filter(x => (x.name != null));
            console.log(transac);
            console.log(transac.length);

            // console.log(tr.filter(x => (parseInt(x.category_id)/1000000 == 13)));
            // console.log(res.transactions.filter(x => x..indexOf('Restaurants')> -1));
            // console.log(res.transactions);
            // console.log(`You have ${res.transactions.length} transactions from the last thirty days.`);
        });
    }).catch(err => {
        throw new Error(`Unreachable code block for example: ${err}`);
    });
}