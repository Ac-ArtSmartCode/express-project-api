exports.uploadsImage = (req, res) => {
  const { filename } = req.file;
  if (!filename)
    throw res
      .status(400)
      .send({ error: true, message: "ไม่มีการอัพโหลดรูปภาพ" });
  const thumbnail = `${req.protocol}://localhost:${process.env.PORT}/uploads/${filename}`;
  res.status(200).send({ images: { Path: filename, imageUrl: thumbnail } });
};
