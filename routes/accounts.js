var express = require('express');
var oauth2 = require('../controllers/oauth2.controller');
var accounts = require('../controllers/accounts.controller');
 
var router = express.Router();
 
// oauth2.accessControl 定義在這，對 Web API 的所有 CRUD 確認權限
router.use(oauth2.accessControl, function (req, res, next) {
    // 無權限
    if (res.customError) {
        res.status(res.customStatus).json(res.customError);
        return;
    }
 
    next();
});

// 獲取 /accounts 請求
router.route('/')
    // 取得所有資源
    // oauth2.accessControl 定義在這，可針對 Web API 的 CRUD 個別確認權限
    .get(function (req, res) {
        accounts.getAccounts(req, res);
    })
    // 新增一筆資源
    .post(function (req, res) {
        accounts.addAccount(req, res);
    });
 
// 獲取如 /accounts/1 請求
router.route('/:username')
    // 取得指定的一筆資源
    .get(function (req, res) {
        accounts.getAccount(req, res);
    })
    // 刪除指定的一筆資源
    .delete(function (req, res) {        
        accounts.deleteAccount(req, res);
    })
    // 覆蓋指定的一筆資源
    .put(function (req, res) {
        accounts.putAccount(req, res);
    })
 
module.exports = router;