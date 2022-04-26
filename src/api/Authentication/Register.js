const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../../Model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post(
  "/register",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Email is required").isEmail(),
    body("password", "At least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json([{ msg: "An acoount with this email already exists" }]);

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const savedUser = await user.save();

      const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

      //send cookies in httpOnly

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      }).send;
      res.status(200).json("Register Successful");
    } catch (err) {
      res.status(500);
    }
  }
);

module.exports = router;
