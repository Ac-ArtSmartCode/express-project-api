const router = require("express").Router();
const Comment = require("../../controller/commentController");
const { authen } = require("../../middleware/authen");
router.post("/:id", authen, Comment.add);
router.get("/:id", authen, Comment.getById);
module.exports = router;
