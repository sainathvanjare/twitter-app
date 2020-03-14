var mongoose = require("mongoose");
var router = require("express").Router();
var User = mongoose.model("User");
var auth = require("../auth");
var postController = require("../../controllers/postcontroller");

router.post("/addPost", postController.addPost);

router.get("/getAllPost", postController.getAllPosts);

module.exports = router;
