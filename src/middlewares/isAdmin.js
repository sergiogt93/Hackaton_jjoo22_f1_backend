// middleware to validate if is a admin user
module.exports = async (req, res, next) => {
  try {
    const usernameCorrect = "jobx_admin";

    if (req.user.username !== usernameCorrect) {
      return res.status(404).json({ msg: "No eres administrador" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
