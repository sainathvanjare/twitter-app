var mongoose = require("mongoose");
var User = mongoose.model("User");

exports.addOrUpdateUser = async function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (typeof req.body.user.username !== "undefined") {
        user.username = req.body.user.username;
      }
      if (typeof req.body.user.email !== "undefined") {
        user.email = req.body.user.email;
      }
      if (typeof req.body.user.bio !== "undefined") {
        user.bio = req.body.user.bio;
      }
      if (typeof req.body.user.image !== "undefined") {
        user.image = req.body.user.image;
      }
      if (typeof req.body.user.password !== "undefined") {
        user.setPassword(req.body.user.password);
      }

      return user.save().then(function() {
        return res.json({ user: user.toAuthJSON() });
      });
    })
    .catch(next);
};

exports.getUser = async function(req, res, next) {
  User.findById(req.params.userid)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }
      let data = user.toAuthJSON();
      data["id"] = user._id.toString();
      return res.json({ user: data });
    })
    .catch(next);
};

exports.AddUser = async function(req, res, next) {
  var user = new User();

  user.username = req.body.user.firstName;
  user.email = req.body.user.email;
  user.firstname = req.body.user.firstName;
  user.lastname = req.body.user.lastName;
  // user.country = req.body.user.country;
  user.setPassword(req.body.user.password);

  user
    .save()
    .then(function() {
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
};
