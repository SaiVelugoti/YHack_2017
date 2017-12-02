var app = require("../express");
const plaid = require('plaid');
const keys = require("../keys");

const public_token=null;

const plaidClient = new plaid.Client(keys.client_id, keys.secret, keys.public_key, plaid.environments.sandbox);

app.get('/api/link', getAccounts);

function getAccounts(req, res) {
     var t = req.query["public_token"];
    //console.log("Hello -> link server");
    //console.log(req.body);
    plaidClient.exchangePublicToken(t, function(err, rsp1) {
        console.log(rsp1);
        const access_token = rsp1.access_token;
        res.json(rsp1.access_token);
        // plaidClient.getAccounts(access_token, function(err, rsp2) {
        //     console.log(rsp2.accounts);
        //     res.json(rsp2.accounts);
        // });
    });
}