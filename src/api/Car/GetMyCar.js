const router = require("express").Router();
const Car = require("../../Model/CarSchema");
const auth = require("../../middleware/auth");

router.get("/my-car", auth, async (req, res) => {
  try {
    const car = await Car.find({ user: req.user }).populate("user", ["name"]);
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Bad Request" });
  }
});

module.exports = router;
