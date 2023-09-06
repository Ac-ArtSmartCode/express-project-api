exports.jsonRes =
  (res) =>
  (status, message = [], err = false) => {
    const response = { error: err, message: message };

    return res.status(status).send(response);
  };
