const express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const mysql = require('mysql');
var db = require('../models/dbconnection');

// var connection = mysql.createPool({
//     host: process.env.MODE == 'dev' ? 'localhost' : 'eu-cdbr-west-02.cleardb.net',
//     user: process.env.MODE == 'dev' ? 'root' : 'b1750ef905d503',
//     password: process.env.MODE == 'dev' ? 'werTT75&' : '30524845',
//     database: process.env.MODE == 'dev' ? 'users_test' : 'heroku_9517f6a4faa8437'
// });

router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function (req, res) {
    db.query('SELECT * FROM users', function (err, rows, fields) {
        res.json(rows);
    });
});

router.get("/:id", function (req, res) {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], function (err, rows, fields) {
        res.json(rows);
    });
});

router.post("/create", function (req, res) {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
    db.query(queryString, [firstName, lastName], function (err, results, fields) {
        if (err) {
            console.log("Failed insert user" + err);
            res.sendStatus(500);
            return
        }
        console.log("insert a new user with id:", results.insertId);
        res.end();
    });
});

module.exports = router;