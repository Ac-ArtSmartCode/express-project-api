const router = require("express").Router();
const { uploadsImage } = require("../../controller/imageUpload");
const { uploads } = require("../../middleware/upLoadFile");
router.post("/single", uploads, uploadsImage);

module.exports = router;
