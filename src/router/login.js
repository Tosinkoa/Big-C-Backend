const router = require("express").Router();
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("local", { successMessage: "Login successful" }),
  function (req, res) {
    res.send("Login Sucessful");
  }
);
module.exports = router;
