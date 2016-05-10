/**
 * Created by sai on 2016/05/10.
 */
var database = require('../server/database.js');
var json2html = require('node-json2html');

var transform1 = {
    tag: 'td',"html": "${name}"
};

var transform2 = {
    tag: 'tr',
    children: [{
        "tag": "td",
        "html": "${CORP_CD}"
    }, {
        "tag": "td",
        "html": "${TT_CD}"
    }, {
        "tag": "td",
        "html": "${TT_NAME_SEI}"
    }, {
        "tag": "td",
        "html": "${TT_NAME_MEI}"
    }]
};

module.exports = {
    queryAll : function(req, res, next) {
    database.simpleExecute(
            'SELECT CORP_CD,TT_CD,TT_NAME_SEI,TT_NAME_MEI ' +
            'FROM TBL_OPERATOR_TBL',
        {}, //no binds
        {
            outFormat: database.OBJECT
        }
        )
        .then(function(results) {
            var html = '<table border="1" cellspacing="1" cellpadding="1" ><tr>';
            html += json2html.transform(results.metaData,transform1);
            html += '</tr>';
            html += json2html.transform(results.rows,transform2);
            html += '</table>';
            res.send(html);
        })
        .catch(function(err) {
            next(err);
        });
    },
    queryById : function(req, res, next) {
        database.simpleExecute(
            'SELECT CORP_CD,TT_CD,TT_NAME_SEI,TT_NAME_MEI' +
            ' FROM TBL_OPERATOR_TBL WHERE TT_CD = :TT_CD' ,
            {TT_CD : req.query.TT_CD},
            {
                outFormat: database.OBJECT
            }
            )
            .then(function(results) {
                var html = '<table border="1" cellspacing="1" cellpadding="1" ><tr>';
                html += json2html.transform(results.metaData,transform1);
                html += '</tr>';
                html += json2html.transform(results.rows,transform2);
                html += '</table>';
                res.send(html);
            })
            .catch(function(err) {
                next(err);
            });
    }
};

