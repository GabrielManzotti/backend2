import { Router } from "express";

const cookiesRouter = Router();

const createCb = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    const response = { message: "Cookie vence en 7 días" };
    return res
      .status(201)
      .cookie("mode", "dark", { maxAge })
      .cookie("role", "admin", { maxAge })
      .json(response);
  } catch (error) {
    next(error);
  }
};

const createSignedCb = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    const message = "Cookie vence en 7 días";
    return res
      .status(201)
      .cookie("user", "gabi", { maxAge, signed: true })
      .cookie("id", "12345789", { maxAge, signed: true })
      .json({ message });
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const cookies = req.cookies;
    return res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};

const readSignedCb = (req, res, next) => {
  try {
    const cookies = req.signedCookies;
    return res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};

const clearCb = (req, res, next) => {
  try {
    const message = "Cookies eliminadas";
    return res
      .status(200)
      .clearCookie("user")
      .clearCookie("role")
      .json(message);
  } catch (error) {
    next(error);
  }
};

cookiesRouter.get("/create", createCb);
cookiesRouter.get("/create-signed", createSignedCb);
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/read-signed", readSignedCb);
cookiesRouter.get("/clear", clearCb);

export default cookiesRouter;
