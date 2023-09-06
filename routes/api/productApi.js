const router = require("express").Router();
const Product = require("../../controller/productController");
const { authenAdmin } = require("../../middleware/authen");

router.post("/", authenAdmin, Product.add);
router.get("/", Product.get);
router.get("/:id", Product.getById);
router.delete("/:id", authenAdmin, Product.delete);

module.exports = router;
