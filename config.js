const Joi = require('joi');

// require and configure dotenv, will load vars in .env in process.env
require('dotenv').config();

const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: Joi.number().default(3000),
  ATLAS_URI: Joi.string(),
  VERSION: Joi.string().default('1.0.0'),
  secret: Joi.string(),
  increaseTime: Joi.number()
}).unknown().required();
// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // API版本
  env: envVars.NODE_ENV, // 開發模式(development、production)
  port: envVars.PORT, // API 阜號
  uri: envVars.ATLAS_URI, //ATLAS URI
  secret: envVars.secret, // JWT 自訂私鑰
  increaseTime: envVars.increaseTime // JWT 加上多少時間過期 (UNIX 時間戳)
};

module.exports = config; // 匯出共用