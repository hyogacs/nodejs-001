var sql = require('mssql');

var config = {
    user: 'aa',
    password: 'aa',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'nodejs',
    connectionTimeout: 3000,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

function createPool() {
    return new Promise(function(resolve, reject) {
        sql.connect(config).then(function () {
            console.log("sqlserver is connected.");
            resolve();
        }).catch(function (err) {
            console.error(err);
            return reject(err);
        });
    });
}

module.exports.createPool = createPool;

function terminatePool() {
    return new Promise(function(resolve, reject) {        
        sql.close(function(err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });        
    });
}

module.exports.terminatePool = terminatePool;


