const router = require("express").Router();

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: 'true',
      sameSite: "none",
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
