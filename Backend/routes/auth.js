const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/Fetchuser");

const JWT_SECRET = "zander@secretString";

//ROUTE 1: creating a user using POST: "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "The name must contain atleast 3 characters").isLength({
      min: 3,
    }),
    body("email", "The email must be unique & in proper format").isEmail(),
    // password must be at least 5 chars long
    body("password", "The password must contain atleast 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    //IF there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether the user with same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a bad request " });
      }
      const salt = await bcrypt.genSalt(10);

      const SafePass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SafePass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });

    } catch (error) {
      //To send unexpected errors
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//creating a user part completed

//ROUTE 2: Login EndPoint Of User POST: "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter The correct email").isEmail(),
    body("password", "Enter The correct password").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please Enter correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password); //It will compare the hashes internally and will return boolean value
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please Enter correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Get logged in user details using POST: "/api/auth/getuser"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
//Sample authentication token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTg0ZGJhOTUxZWU3ZjFlNTZiN2M3In0sImlhdCI6MTY4MTQ5MTE2M30.3aK6Lw76OgQPI9dE-1a1rFA4WWLqo0c0-UKLqks1wLM"  the above token is separated by 3 dost, the last part is for signature and it is used to verify whether any of our user has modified the credential data using jwt.verify method
