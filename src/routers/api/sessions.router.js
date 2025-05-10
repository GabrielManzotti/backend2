import { Router } from "express";

const sessionsRouter = Router();

const createCb = (req, res, next) => {
  try {
    req.session.role = "admin";
    req.session.mode = "dark";
    const message = "Session vence en 7 días";
    return res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const session = req.session;
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
};

const destroyCb = (req, res, next) => {
  try {
    req.session.destroy();
    const message = "Session eliminada";
    return res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

sessionsRouter.get("/create", createCb);
sessionsRouter.get("/read", readCb);
sessionsRouter.get("/destroy", destroyCb);

export default sessionsRouter;
