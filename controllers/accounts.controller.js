const bcrypt = require('bcrypt');
let Account = require('../models/account.model');
const Responce = require('../models/responce.model')

const getAccounts = (req, res) => {
    Account.find(null, '-_id -createdAt -updatedAt -__v -password')
    .then(accounts => res.json(Responce.responce(1, accounts, 'Success.')))
    .catch(err => {
        res.json(Responce.responce(-1, [], err));
        return;
    });
  };

const getAccount = (req, res) => {
    Account.findOne({username: req.params.username})
      .then(result => {
        if (result) {
          Account.findOne({username: result.username}, '-_id -createdAt -updatedAt -__v')
          .then(account => res.json(Responce.responce(1, [account], 'Success.')))
          .catch(err => {
              res.json(Responce.responce(-1, [], err))
              return;
          });
        }
        else
        {
            res.json(Responce.responce(-1, [], 'Account is not exist.'));
            return;
        }
      })
      .catch(err => {
          res.json(Responce.responce(-1, [], err))
          return;
      });
  };

const addAccount = (req, res) => {
    Account.findOne({username: req.body.username})
    .then(result => {
      if (!result) {
        // 取得新增參數
        const insertValues = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
        };
        const newAccount = new Account (insertValues);
        newAccount.save()
        .then(() => res.json(Responce.responce(1, [{username: insertValues.username, role: insertValues.role}], 'Success.')))
        .catch(err => {
            res.json(Responce.responce(-1, [], err))
            return;
        });
      }
      else
      {
        res.json(Responce.responce(-1, [], 'Account is already exist.'));
        return;
      }
    })
}

const deleteAccount = (req, res) => {
    Account.deleteOne({username: req.params.username})
    .then(err => {
        if (err.deletedCount == 0) {
            res.json(Responce.responce(-1, [], err));
            return;
        }
        else
        {
            res.json(Responce.responce(1, [], 'Account is deleted.'));
        }
    })
}

const putAccount = (req, res) => {
    Account.findOne({username: req.params.username})
    .then(result => {
      if(result){
        const insertValues = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            role: req.body.role
        };

        Account.update({username: req.params.username},
        { $set: {
          ...insertValues
        }},
        { runValidators: true })
        .then(() => res.json(Responce.responce(1, [insertValues], 'Success.')))
        .catch(err => {
            res.json(Responce.responce(-1, [], err));
            return;
        });
      }
      else
      {
        res.json(Responce.responce(-1, [], 'Account is not exist.'));
        return;
      }
    })
    .catch(err => {
        res.json(Responce.responce(-1, [], err));
        return;
    });
}

const accountLogin = (req, res, next) => {
    // 取得帳密
    Account.findOne({username: req.body.username})
      .then(result => {
        if(result)
        {
            const dbHashPassword = result.password; // 資料庫加密後的密碼
            const userPassword = req.body.password; // 使用者登入輸入的密碼
            bcrypt.compare(userPassword, dbHashPassword).then((bresult) => { // 使用bcrypt做解密驗證
                if (bresult) {
                    req.results = [{username: result.username, role: result.role}];
                    next();
                } else {
                    res.json(Responce.responce(-1, [], 'Error: Password is wrong.'));// 登入失敗
                    return;
                }
            });
        }
        else
        {
            res.json(Responce.responce(-1, [], 'Account is not exist.'));
            return;
        }
      })
      .catch(err => {
          res.json(Responce.responce(-1, [], err));
          return;
      });
  };

module.exports = {
    getAccounts,
    getAccount,
    addAccount,
    deleteAccount,
    putAccount,
    accountLogin
};
  