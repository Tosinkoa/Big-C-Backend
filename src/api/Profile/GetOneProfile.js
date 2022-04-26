const Profile = require("../../Model/ProfileSchema");
const router = require("express").Router();
const auth = require("../../middleware/auth");

router.get("/profile/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.user).populate("user");
    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
