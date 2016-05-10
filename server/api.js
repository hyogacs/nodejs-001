/**
 * Created by sai on 2016/05/10.
 */
var express = require('express');
var database = require('./database.js');

function getRouter() {
    var router = express.Router();

    router.route('/emps')
        .get(getEmps);

    router.route('/depts')
        .get(getDepts);

    router.route('/users')
        .get(getUsers);

    router.route('/poolstatus')
        .get(getPoolStatus);

    return router;
}

module.exports.getRouter = getRouter;

function getPoolStatus(req,res,next){
   database.getPool()._logStats();
    res.send('');
}

function getEmps(req, res, next) {
    database.simpleExecute(
            'SELECT employee_id, ' +
            '    first_name, ' +
            '    last_name, ' +
            '    email, ' +
            '    phone_number, ' +
            '    TO_CHAR(hire_date) AS hire_date, ' +
            '    job_id, ' +
            '    salary, ' +
            '    commission_pct, ' +
            '    manager_id, ' +
            '    department_id ' +
            'FROM employees',
        {}, //no binds
        {
            outFormat: database.OBJECT
        }
        )
        .then(function(results) {
            res.send(results);
        })
        .catch(function(err) {
            next(err);
        });
}

function getDepts(req, res, next) {
    database.simpleExecute(
            'SELECT department_id, ' +
            '    department_name, ' +
            '    manager_id, ' +
            '    location_id ' +
            'FROM departments',
        {}, //no binds
        {
            outFormat: database.OBJECT
        }
        )
        .then(function(results) {
            res.send(results);
        })
        .catch(function(err) {
            next(err);
        });
}

function getUsers(req, res, next) {
    database.simpleExecute(
            'SELECT * ' +
            'FROM tbl_operator_tbl',
        {}, //no binds
        {
            outFormat: database.OBJECT
        }
        )
        .then(function(results) {
            res.send(results);
        })
        .catch(function(err) {
            next(err);
        });
}