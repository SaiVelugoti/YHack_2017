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
    plaidClient.exchangePublicToken(t).then (rsp1 => {
        console.log(rsp1.access_token);
        return res.json(rsp1.access_token);
    }).catch(err => {
        throw new Error(`Unreachable code block for example: ${err}`);
    });
        

}