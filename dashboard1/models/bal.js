const { Schema, model } = require("mongoose");

// We declare new schema.
const guild_bal = new Schema({
  gid: { type: String },
  userid: {type: String},
  coins: { type: Number, default: '0'},
  coinsinWallet: {type: Number, default: '250'}, 
  coinsinBank: {type: Number, default: '0'}, 
  bankspace: {type: Number, default: '5000'},
  job: {type: String}
});

// We export it as a mongoose model.
module.exports = model("guild_bal", guild_bal);