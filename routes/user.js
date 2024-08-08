const express = require("express");
const router = express.Router();
const User = require("../models/user.js")


router.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const register = await User.register(newUser, password);
        console.log(register);
        res.send("Registration successful!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed. Please try again.");
    }
});


module.exports = router;