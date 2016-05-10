/**
 * Created by sai on 2016/05/10.
 */
var oracledb = require('oracledb');
var dbConfig = require('../conf/dbconfig.js');
var connection;

function doRelease(connection) {
    connection.release(
        function (err) {
            if(err){
                console.error(err.message);
                return;
            }
        });
}

function jsonWrite (res, result) {
    if(typeof result === 'undefined') {
        res.json({
            code:'1',
            msg: 'Operate failed.'
        });
    } else {
        res.json(result);
    }
};

module.exports = {
    queryAll :function (req, res, next)
    {
        oracledb.getConnection(
            {
                user: dbConfig.user,
                password: dbConfig.password,
                connectString: dbConfig.connectString
            },
            function (err,conn) {
                if(err){
                    console.error(err.message);
                    return;
                }
                connection = conn;
                connection.execute(
                    "SELECT * FROM TBL_OPERATOR_TBL",
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        console.log(result.metaData);
                        console.log(result.rows);
                        jsonWrite(res,result);
                        doRelease(connection);
                    }
                );
            }
        );
    },
    queryById :function (req, res, next)
    {
        oracledb.getConnection(
            {
                user: dbConfig.user,
                password: dbConfig.password,
                connectString: dbConfig.connectString
            },
            function (err,conn) {
                if(err){
                    console.error(err.message);
                    return;
                }
                connection = conn;
                connection.execute(
                    "SELECT * FROM TBL_OPERATOR_TBL WHERE TT_CD = :TT_CD",
                    [req.query.TT_CD],
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        console.log(result.metaData);
                        console.log(result.rows);
                        jsonWrite(res,result.rows);
                        doRelease(connection);
                    }
                );
            }
        );
    }
}

