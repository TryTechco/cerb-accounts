var bodyparser = require('body-parser');    // 解析 HTTP 請求主體的中介軟體
var express = require('express');
var cors = require('cors');                 // 跨來源資源共用 (允許不同網域的 HTTP 請求)
 
var config = require('./config');
var oauth2Token = require('./routes/oauth2-token');
var tokenVerify = require('./routes/token-verify');
var accounts = require('./routes/accounts');
let register = require('./routes/register');

const mongoose = require('mongoose');

mongoose.connect(config.uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
 
var app = express();
 
app.use(cors());
 
// 使用 bodyparser.json() 將 HTTP 請求方法 POST、DELETE、PUT 和 PATCH，放在 HTTP 主體 (body) 發送的參數存放在 req.body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/register', register);
 
app.use('/oauth2/token', oauth2Token);
 
// 不須 token 即可訪問的 Web API 須定義在此上面，通常登入頁面 (此例為登入驗證取得 token 頁面的 /auth2/token)
app.use(tokenVerify);
 
app.use('/accounts', accounts);
 
app.listen(config.port, function () {
    console.log('app listening on port ' + config.port + '!');
});