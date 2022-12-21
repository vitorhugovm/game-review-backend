const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.games = require("./game.model.js")(mongoose);
db.reviews = require("./review.model.js")(mongoose);

module.exports = db;
