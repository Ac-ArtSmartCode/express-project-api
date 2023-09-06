const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  message: {
    error: true,
    message: "ล็อคอินเกินจำนวนกรุณารอซักครู่แล้วลองใหม่อีกครั้ง",
  },
  max: 5,
});

module.exports = apiLimiter;
