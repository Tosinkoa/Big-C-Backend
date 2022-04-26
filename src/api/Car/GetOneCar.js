const router = require("express").Router();
const auth = require("../../middleware/auth");
const Car = require("../../Model/CarSchema");

router.get("/onecar/:id", auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
