const mongoose = require('mongoose');
const Async = require('async');
const bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  role: String,
});

userSchema.pre('save', function (next) {
  var _this = this;
  if (_this.isNew) {
    Async.waterfall([
      function encryptPassword(wfaCallback) {
        bcrypt.genSalt(10, function (err, salt) {

          bcrypt.hash(_this.password, salt, null, function (err, hash) {
            _this.password = hash;
            return wfaCallback(err);
          });
        });
      },

      function encryptToken(wfaCallback) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(_this.token, salt, null, function (err, hash) {
            _this.token = hash;
            return wfaCallback(err);
          });
        });
      },

    ],
    function (err) {
      console.log('saving ended');
      next(err);
    });
  } else next();
});

module.exports = mongoose.model('users', userSchema);