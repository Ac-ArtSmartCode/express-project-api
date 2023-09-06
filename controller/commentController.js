const commentModels = require("../models/commentModels");
const { tryCatch } = require("../utils/tryCatch");

exports.add = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { comment, ratting, user_id } = req.body;
  if (Object.keys(req.body).length == 0)
    throw res.status(400).send({ error: true, message: "กรุณากรอกข้อความ" });
  const comments = await commentModels.create({
    product_id: id,
    ratting,
    user_id,
    comment,
  });
  if (!comments)
    throw res
      .status(400)
      .send({ error: true, message: "เกิดข้อผิดพลาดในการรีวิว!" });
  return res
    .status(201)
    .send({ error: false, message: "ท่านได้ทำการรีวิวแล้ว!" });
});

exports.getById = tryCatch(async (req, res) => {
  const { id } = req.params;
  const comment = await commentModels.find({ product_id: id });
  if (comment.length == 0)
    throw res
      .status(409)
      .send({ error: true, message: "ไม่มีคอมเมนท์ในขณะนี้.." });
  return res.status(200).send({ data: comment });
});
