const router = require("express").Router();
const homePage = require("./homePageApi");
const UserRouter = require("./usersApi");
const uploadImage = require("./upLoadImage");
const ProductRouter = require("./productApi");
const CommentRoutter = require("./commentApi");
const ShopcartRouter = require("./shopCartApi");
const GetMe = require("./getMeApi");
require("dotenv").config();
router.use("/", homePage);
router.use("/users", UserRouter);
router.use("/product", ProductRouter);
router.use("/shopcart", ShopcartRouter);
router.use("/comment", CommentRoutter);
router.use("/uploadImage", uploadImage);
router.use("/me", GetMe);

module.exports = router;
