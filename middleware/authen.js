const { tryCatch } = require("../utils/tryCatch");
const jwt = require("jsonwebtoken");
exports.authen = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ error: true, message: "เกิดข้อผิดพลาด!!กรุณาล็อคอิน" });
  const decoded = jwt.verify(token, process.env.API_KEY);
  return next();
};

exports.authenAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ error: true, message: "เกิดข้อผิดพลาด!!กรุณาล็อคอิน" });
    const decoded = jwt.verify(token, process.env.API_KEY);

    if (decoded.user.role != "admin") {
      return res
        .status(403)
        .json({ error: true, message: "ไม่มีสิทธิในการใช้งานฟังก์ชั่นนี้" });
    }
    return next();
  } catch (error) {
    next(error);
  }
};
