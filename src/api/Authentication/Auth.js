const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("/auth", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }
    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
