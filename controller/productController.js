const Product = require("../models/productModels");
const { tryCatch } = require("../utils/tryCatch");
const { imageUtils } = require("../utils/getImage");
const shopcart = require("../models/shopcartModels");

exports.add = tryCatch(async (req, res) => {
  if (Object.keys(req.body).length == 0)
    return res
      .status(400)
      .send({ error: true, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  const products = await Product.create(req.body);
  if (!products.length == 0)
    return res
      .status(500)
      .send({ error: true, message: "เกิดข้อผิดพลาดในการเพิ่่มข้อมูลสินค้า" });
  return res
    .status(201)
    .json({ error: false, message: "เพิ่มข้อมูลสินค้าสำเร็จกรุณาตรวจสอบ" });
});

exports.get = tryCatch(async (req, res, next) => {
  const product = await Product.find();
  const doc = product.map((items) => {
    items.img_url = imageUtils(items.prod_image);
    return items;
  });
  if (!product)
    return res.status(204).send({ error: true, message: "ไม่พบสินค้า" });
  return res.status(200).send({ data: doc });
});
exports.getById = tryCatch(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  product.img_url = imageUtils(product.prod_image);
  if (!product)
    return res.status(204).send({ error: true, message: "ไม่พบสินค้า" });
  return res.status(200).send({ data: product });
});

exports.delete = tryCatch(async (req, res) => {
  const { id } = req.params;
  const shopC = await shopcart.find({ product_id: id });
  if (shopC) {
    await shopcart.deleteMany({ product_id: id });
  }
  const product = await Product.findByIdAndDelete(id);
  res.status(200).send({ error: false, message: "ลบข้อมูลสำเร็จ!" });
});
