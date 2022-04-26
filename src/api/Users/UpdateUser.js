const router = require("express").Router();
const auth = require("../../middleware/auth");
const User = require("../../Model/UserSchema");

router.put("/update-user", auth, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });

    const userUpdate = await user.save();
    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
