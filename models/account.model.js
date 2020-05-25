const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    studentId: {type: String, require: true},
    studentName: {type: String, require: true},
    role: {type: String, require: true},
    },
    { timestamps: true }
  );

const Account = mongoose.model('account', accountSchema);

module.exports = Account;