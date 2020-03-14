var mongoose = require("mongoose");
var User = mongoose.model("User");
var Posts = mongoose.model("Posts");

exports.getAllPosts = async function(req, res, next) {
  Posts.find()
    .then(function(data) {
      if (!data) {
        return res.sendStatus(401);
      }

      return res.json({ data: data });
    })
    .catch(next);
};

exports.addPost = async function(req, res, next) {
  var post = new Posts();
  post.title = req.body.post.title;
  post.description = req.body.post.description;
  post.userId = req.body.post.userId;

  post
    .save()
    .then(function() {
      return res.json({ Posts: post });
    })
    .catch(next);
};
