const router = require("express").Router();
const Shopcart = require("../../controller/shopcartController");
const { authen } = require("../../middleware/authen");
router.post("/", authen, Shopcart.add);
router.get("/", authen, Shopcart.get);
router.put("/:id", authen, Shopcart.edit);

module.exports = router;
