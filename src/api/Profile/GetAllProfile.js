const Profile = require("../../Model/ProfileSchema");
const router = require("express").Router();
const auth = require("../../middleware/auth");

router.get("/all-profiles", auth, async (req, res) => {
  try {
    const allProfile = await Profile.find();
    res.status(200).json(allProfile);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
