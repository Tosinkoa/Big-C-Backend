const router = require("express").Router();
const auth = require("../../middleware/auth");
const Car = require("../../Model/CarSchema");

router.put("/update-car/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    const updatedCar = await car.save();
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
