const isAdmin = () => {
  return (req, res, next) => {
    try {
      if (req.user.role !== "admin") {
        throw { code: 403, message: "Forbidden!" };
      }

      //lanjut ke request selanjutnya
      next();
    } catch (err) {
      res.status(err.code).json(err);
    }
  };
};

module.exports = isAdmin;
