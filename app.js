//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
const userSchema = {
  email: String,
  password: String
};
const User = new mongoose.model("User", userSchema);



//////////HOME Route///////////////////////
app.route("/")
.get(function(req, res){
  res.render("home");
});
//////////LOGIN Route///////////////////////

app.route("/login")
.get(function(req, res){
  res.render("login");
})
.post(function(req, res){
  const userName = req.body.username;
  const passWord = req.body.password;

  User.findOne({email: userName},function(err, foundUser){
    if (err){
      console.log(err);
    }else{
      if (foundUser){
        if (foundUser.password === passWord){
          res.render("secrets");
        }
      }
    }
  });
});
//////////REGISTER Route///////////////////////

app.route("/register")
.get(function(req, res){
  res.render("register");
})
.post(function(req, res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if(!err){
      res.render("secrets");
    }else{
      console.log(err);
    }
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
