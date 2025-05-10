import { Router } from "express";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";
import passport from "../middlewares/passport.mid.js";

const viewsRouter = Router();

const indexView = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    res.status(200).render("index", { products });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const detailView = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readById(pid);
    console.log(product);
    res.status(200).render("detail", { pid, product });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const registerView = async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const loginView = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const profileView = async (req, res) => {
  try {
    const { user } = req;
    const formatted = new Date(user.date).toLocaleDateString("es-AR");
    console.log(formatted);
    res.status(200).render("profile", { user, formatted });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const updateUserView = async (req, res) => {
  try {
    res.status(200).render("update-user");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const adminPanel = async (req, res) => {
  try {
    res.status(200).render("panel-admin");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

viewsRouter.get("/", indexView);
viewsRouter.get("/details/:pid", detailView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/login/", loginView);
viewsRouter.get("/profile/", passport.authenticate("user", { session: false }), profileView);
viewsRouter.get("/adminPanel/", passport.authenticate("admin", { session: false }), adminPanel);
viewsRouter.get("/update-user", updateUserView);

export default viewsRouter;
