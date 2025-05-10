const isUser = (req, res, next) => {
  try {
    if (req.session.user_id) {
      const { user_id, email, rol } = req.session;
      req.user = { user_id, email, rol };
      next();
    } else {
      const error = new Error("user not online");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export default isUser;
