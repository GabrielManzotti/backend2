import { response, Router } from "express";
import passportCb from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res.status(201).json({ message: "Registered", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};

const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(200)
      .cookie("token", req.user.token, { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ message: "logged in", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};

const signOutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    return res.status(200).clearCookie("token").json({
      message: "sign out",
      method,
      url,
    });
  } catch (error) {
    next(error);
  }
};

const badAuthCb = (req, res, next) => {
  try {
    const error = new Error("Bad Auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const forbidden = (req, res, next) => {
  try {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  } catch (error) {
    next(error);
  }
};

const onlineCb = (req, res, next) => {
  const user_id = req.user._id;
  const isAdmin = req.user.role === "ADMIN" ? true : false;
  try {
    const { method, originalUrl: url } = req;
    return res.status(200).json({
      message: "is online",
      response: true,
      method,
      url,
      user_id,
      isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const googleCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(200)
      .cookie("token", req.user.token, { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .redirect("/");
  } catch (error) {
    next(error);
  }
};

export default authRouter;

const optsBad = {
  session: false,
  failureRedirect: "/api/auth/bad-auth",
};

const optsForbidden = {
  session: false,
  failureRedirect: "/api/auth/forbidden",
};

authRouter.post("/register", passport.authenticate("register", optsBad), registerCb);
authRouter.post("/login", passport.authenticate("login", optsBad), loginCb);
authRouter.post("/signOut", passport.authenticate("user", optsForbidden), signOutCb);
authRouter.post("/online", passport.authenticate("user", optsForbidden), onlineCb);
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"], ...optsBad }));
authRouter.get("/google/redirect", passport.authenticate("google", optsBad), googleCb);
authRouter.get("/bad-auth", badAuthCb);
authRouter.get("/forbidden", forbidden);
