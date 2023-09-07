const { authen } = require("../../middleware/authen");
const userModels = require("../../models/userModels");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
router.get("/", authen, async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.API_KEY);
  const users = await userModels.findOne({ email: decoded.user.email });
  if (!users)
    throw res.status(409).send({ error: true, message: "เกิดข้อผิดพลาด" });
  res.status(200).send({ error: false, message: "ข้อมูลผู้ใช้", data: users });
});
module.exports = router;
