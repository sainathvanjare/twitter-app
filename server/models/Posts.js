var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var secret = require("../config").secret;

var PostSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    description: { type: String },
    userId: String
  },
  { timestamps: true }
);

mongoose.model("Posts", PostSchema);
