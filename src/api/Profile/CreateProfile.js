const router = require("express").Router();
const Profile = require("../../Model/ProfileSchema");
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const cloudinary = require("../../lib/cloudinary");
const upload = require("../../lib/multer");

const profileImages = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

router.post(
  "/create-profile",
  profileImages,
  auth,
  [
    body("name", "Name field must not be empty").not().isEmpty(),
    body("businessStatus", "A business status must be selected").not().isEmpty(),
    body("description", "Description field should not be empty").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { description, businessStatus, availability, phoneNumber, name } = req.body;

      const profileImageResult = await cloudinary.uploader.upload(req.files["profileImage"][0].path);
      const coverImageResult = await cloudinary.uploader.upload(req.files["coverImage"][0].path);

      let profile = await Profile.findById(req.user);

      if (profile) {
        await cloudinary.uploader.destroy(profile.profileImage_id);
        await cloudinary.uploader.destroy(profile.coverImage_id);

        const putProfileImageResult = await cloudinary.uploader.upload(req.files["profileImage"][0].path);
        const putCoverImageResult = await cloudinary.uploader.upload(req.files["coverImage"][0].path);

        profile = await Profile.findOneAndUpdate({
          id: req.user,
          profileImage: putProfileImageResult.secure_url,
          profileImage_id: putProfileImageResult.public_id,
          coverImage: putCoverImageResult.secure_url,
          coverImage_id: putCoverImageResult.public_id,
          name: name,
          description: description,
          businessStatus: businessStatus,
          availability: availability,
          phoneNumber: phoneNumber,
        });
        return res.status(200).json(profile);
      }

      profile = new Profile({
        _id: req.user,
        profileImage: profileImageResult.secure_url,
        profileImage_id: profileImageResult.public_id,
        coverImage: coverImageResult.secure_url,
        coverImage_id: coverImageResult.public_id,
        name: name,
        description: description,
        businessStatus: businessStatus,
        availability: availability,
        phoneNumber: phoneNumber,
      });
      const savedProfile = await profile.save();
      res.json(savedProfile);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
);

module.exports = router;
