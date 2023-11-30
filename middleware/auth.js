const auth = (req, res, next) => {
  let header = req.header("access");
  if (header === "bibhu") next();
  else res.status(403).send({ error: "unauthorized" });
};

module.exports = auth;