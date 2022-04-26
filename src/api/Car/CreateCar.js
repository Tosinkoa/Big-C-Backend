const router = require("express").Router();
const Car = require("../../Model/CarSchema");
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const upload = require("../../lib/multer");
const cloudinary = require("../../lib/cloudinary");

router.post(
  "/new-car",
  auth,
  upload.single("carImage"),
  [
    body("carName", "Car name is required").not().isEmpty(),
    body("carPrice", "Car price is required").not().isEmpty(),
    body("carDescription", "Car description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carName, carPrice, carDescription } = req.body;

    try {
      const carImageResult = await cloudinary.uploader.upload(req.file.path);

      const car = new Car({
        user: req.user,
        carImage: carImageResult.secure_url,
        carImage_id: carImageResult.secure_url,
        carName: carName,
        carPrice: carPrice,
        carDescription: carDescription,
      });

      const savedCar = await car.save();
      res.status(200).json(savedCar);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
