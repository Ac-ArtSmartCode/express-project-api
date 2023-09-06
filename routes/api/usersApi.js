const router = require("express").Router();
const { uploadsProfile } = require("../../controller/imageUpload");
const userController = require("../../controller/usersController");
const apiLimiter = require("../../middleware/rateLimit");

router.post("/register", userController.create);
router.post("/login", apiLimiter, userController.login);

module.exports = router;
