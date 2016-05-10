/**
 * Created by sai on 2016/05/10.
 */
var express = require('express');
var database = require('./database.js');

function getRouter() {
    var router = express.Router();

    router.route('/poolstatus')
        .get(getPoolStatus);
    
    return router;
}

module.exports.getRouter = getRouter;

function getPoolStatus(res){
   database.getPool()._logStats();
    res.send('');
}
