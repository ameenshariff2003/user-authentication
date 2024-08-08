const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js")
const user = require("./routes/user.js")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/public")));

const sessionOption = {
  secret : "mysecretcode",
  resave: false,
  saveUninitialized : true,
  Cookie : {
    expires : Date.now() + 3 *24*60*60*60*1000,
    maxAge : 3 *24*60*60*60*1000,
    httpOnly : true,
  },
}

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate));
//authenticate is static method which is default by mangoos for the authntication of signup and login
passport.serializeUser(User.serializeUser());
//User related data is stored in session is serialisation and removing the user related data from session is deserialize
passport.deserializeUser(User.deserializeUser());




app.get("/demo",async(req,res)=>{
  let fakeuser = new User({
    email:"stu@gmail.com",
    username : "delta wale",
  });

  // To store the user we gonna use user.register instead of user.save it is static
  let register = await  User.register(fakeuser,"helloworld");
  //helloworld is password
  res.send(register);
});

app.use("/",user);

//the hashing algo is pbkdf2 hashing algorithm



app.listen(8080,()=>{
    console.log("8080 port is listening");
})