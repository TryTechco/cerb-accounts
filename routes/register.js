var express = require('express');
var accounts = require('../controllers/accounts.controller');

var router = express.Router();

router.route('/')
    // 新增一筆資源
    .post(function (req, res) {
        accounts.addAccount(req, res);
});

module.exports = router;