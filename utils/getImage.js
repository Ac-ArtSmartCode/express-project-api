exports.imageUtils = (file) => {
  if (file) {
    const image = file;
    const thumbnail = `http://localhost:${process.env.PORT}/uploads/${image}`;
    return thumbnail;
  } else {
    return null;
  }
};
