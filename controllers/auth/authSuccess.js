const authSuccess = async (req, res) => {
  console.log(req);
  res.json({ message: "done" });
};

module.exports = authSuccess;
