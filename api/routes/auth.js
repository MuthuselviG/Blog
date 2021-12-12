const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")


//register
router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.send(500).json(err);

    }
});

//login
router.post("/login", async (req, res) => {
    try {

        console.log("In login");
        console.log(req.body);

        const user = await User.findOne({ userName: req.body.user })
        !user && res.status(400).json("Wrong credentials");

        console.log(user)

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong credentials");

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }
    catch (err) {
        console.log(err);
        res.send(500).json(err);

    }
});

module.exports = router;