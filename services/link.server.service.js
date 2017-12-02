var app = require("../express");
var moment = require('moment');
var userModel = require('../model/user/user.model.server');

const plaid = require('plaid');
const keys = require("../keys");
var access_token="";
const public_token=null;

const plaidClient = new plaid.Client(keys.client_id, keys.secret, keys.public_key, plaid.environments.sandbox);

app.put('/api/link', getAccounts);
app.get('/api/transactions', getTransactions);

function getAccounts(req, res) {
     var t = req.query["public_token"];
     var useremail = req.query["useremail"];
    plaidClient.exchangePublicToken(t).then (rsp1 => {
        console.log(rsp1.item_id,rsp1.access_token);
        return userModel.updateUser(useremail,rsp1.access_token)
            .then(function (resp) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(500);
            });
        /*console.log(rsp1.access_token);
        access_token = rsp1.access_token;
        return res.json(rsp1.access_token);*/
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