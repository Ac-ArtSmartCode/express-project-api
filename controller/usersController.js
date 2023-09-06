const User = require("../models/userModels");
const createError = require("http-errors");
const { tryCatch } = require("../utils/tryCatch");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { imageUtils } = require("../utils/getImage");
exports.create = tryCatch(async (req, res) => {
  const { email, password, first_name, last_name, phone, images } = req.body;
  if (!email || !password) throw createError.BadRequest();
  const doseExist = await User.findOne({ email });
  if (doseExist)
    throw res.status(409).send({
      error: true,
      message: `${email} มีในระบบแล้ว!กรุณาลงชื่อเข้าใช้`,
    });
  const user = new User({
    email,
    password,
    first_name,
    last_name,
    phone,
    images,
  });

  const saveUser = await user.save();
  res.status(201).send({
    error: false,
    message: `ยินดีด้วยคุณ ${first_name} สมัครบัญชีผู้ใช้สำเร็จ`,
  });
});

exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw createError.BadRequest();
  const users = await User.findOne({ email });
  if (users) {
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(409).send({
        error: true,
        message: "รหัสผ่านไม่ถูกต้องกรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน",
      });
    }
  } else {
    return res.status(409).send({
      error: true,
      message: "ไม่พบบัญชีผู้ใช้กรุณาตรวจสอบอีเมลอีกครั้ง หรือลงทะเบียนใหม่",
    });
  }
  const payload = {
    user: {
      email,
      role: users.role,
    },
  };
  jwt.sign(
    payload,
    process.env.API_KEY,
    { expiresIn: "2 days" },
    (err, token) => {
      users.img_url = imageUtils(users.images);
      users.token = token;
      if (err) throw err;
      res.status(200).json({ data: users });
    }
  );
});
