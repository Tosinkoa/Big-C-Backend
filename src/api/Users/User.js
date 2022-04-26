const router = require("express").Router();
const User = require("../../Model/UserSchema");
const auth = require("../../middleware/auth");

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Bad request" });
  }
});

module.exports = router;
