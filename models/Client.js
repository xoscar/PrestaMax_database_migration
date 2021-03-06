const mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
  client_id: String,
  name: String,
  surname: String,
  created: {
  	type: Date,
  	default: Date.now,
  },
  address: String,
  phone: String,
  user_id: mongoose.Schema.Types.ObjectId, 
});

module.exports = mongoose.model('clients', clientSchema);