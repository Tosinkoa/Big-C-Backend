const router = require("express").Router();
const Car = require("../../Model/CarSchema");

router.get("/all-cars", async (req, res) => {
  try {
    const car = await Car.find().populate("user", ["name"]);
    res.status(200).json(car);
  } catch (err) {
    return res.status(500).json({ msg: "Bad request" });
  }
});

module.exports = router;
