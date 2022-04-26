const router = require("express").Router();
const User = require("../../Model/UserSchema");
const auth = require("../../middleware/auth");
const Profile = require("../../Model/ProfileSchema");

router.get("/all-user", auth, async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Bad request" });
  }
});

module.exports = router;
