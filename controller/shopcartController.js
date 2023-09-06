const { tryCatch } = require("../utils/tryCatch");
const Shopcart = require("../models/shopcartModels");
const Product = require("../models/productModels");
exports.add = tryCatch(async (req, res) => {
  const { product_id, matter, amount } = req.body;
  const product = await Product.findById(product_id);

  if (!product)
    throw res
      .status(500)
      .send({ error: true, message: "เกิดข้อผิดพลาดในสินค้าชิ้นนี้!!" });
  if (Object.keys(req.body).length === 0)
    throw res
      .status(400)
      .send({ error: true, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  const priceMetter = product.prod_price * matter;
  let total_price = priceMetter * amount;

  const shopcart = await Shopcart.create({
    product_id,
    matter,
    amount,
    total_price,
    colors: product.colors,
  });
  if (!shopcart)
    throw res.status(400).send({
      error: true,
      message: "เกิดข้อผิดพลาดในการเพิ่มสินค้าลงในตะกร้า",
    });
  return res.status(201).json({
    error: false,
    message: "สินค้าถูกเพิ่มลงในตะกร้าแล้ว กรุณาตรวจสอบ",
  });
});

exports.get = tryCatch(async (req, res) => {
  const shopcart = await Shopcart.find({});
  if (shopcart.length == 0)
    throw res
      .status(400)
      .send({ error: true, message: "ไม่พบสินค้าในตะกร้า.." });
  return res.status(200).json({ data: shopcart });
});

exports.edit = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const shopGet = await Shopcart.findById(id);
  const product = await Product.findById(shopGet.product_id);
  const matter = shopGet.matter;
  const priceMetter = product.prod_price * matter;
  const total_price = priceMetter * amount;
  const shopcart = await Shopcart.findByIdAndUpdate(id, {
    matter,
    amount,
    total_price,
  });
  if (!shopcart)
    throw res.status(400).send({
      error: true,
      message: "เกิดข้อผิดพลาดในการแก้ไขสินค้าในตะกร้า",
    });

  return res.status(200).send({ error: false, message: "แก้ไขสินค้าสำเร็จ" });
});
