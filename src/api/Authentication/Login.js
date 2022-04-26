const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../../Model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post(
  "/login",
  [body("email", "Email is required").isEmail(), body("password", "At least 6 characters").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) return res.status(401).json({ errors: [{ msg: "Wrong email or password" }] });

      const passwordCorrect = await bcrypt.compare(password, existingUser.password);

      if (!passwordCorrect) {
        return res.status(401).json({ msg: "Wrong email or password" });
      }

      const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

      //send cookies in httpOnly

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      }).send;
      res.status(200).json("Login Successful");
    } catch (err) {
      res.status(400).json("Bad Request");
    }
  }
);

module.exports = router;
