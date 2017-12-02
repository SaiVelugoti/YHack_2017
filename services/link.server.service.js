var app = require("../express");
var moment = require('moment')

const plaid = require('plaid');
const keys = require("../keys");
var access_token="";
const public_token=null;

const plaidClient = new plaid.Client(keys.client_id, keys.secret, keys.public_key, plaid.environments.sandbox);

app.get('/api/link', getAccounts);
app.get('/api/transactions', getTransactions);

function getAccounts(req, res) {
     var t = req.query["public_token"];
    //console.log("Hello -> link server");
    //console.log(req.body);
    plaidClient.exchangePublicToken(t).then (rsp1 => {
        console.log(rsp1.access_token);
        access_token = rsp1.access_token;
        return res.json(rsp1.access_token);
    }).catch(err => {
        throw new Error(`Unreachable code block for example: ${err}`);
    });
}
function getTransactions(req,res) {
    /*const now = moment();
    const today = now.format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');
    plaidClient.getTransactions(access_token).then (rsp1 => {
        console.log(rsp1);
        //return res.json(rsp1.access_token);
    }).catch(err => {
        throw new Error(`Unreachable code block for example: ${err}`);
    });*/
    const now = moment();
    const today = now.format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

    plaidClient.getTransactions(access_token, thirtyDaysAgo, today).then(resp=>{
        console.log(resp.transactions.length+"the res.trans is -----------");
        // return resp.transactions
        res.json(resp.transactions);
    }).catch(err => {
        console.log(err);
        throw new Error(`Unreachable code block for example: ${err}`);

    });
}