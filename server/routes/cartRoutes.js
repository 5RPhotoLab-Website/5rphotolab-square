import express from "express";
import cartsController from "../controllers/cartsCRUD.js";

const cartsRouter = express.Router();

cartsRouter.get("/", cartsController.getCart);
cartsRouter.post("/add", cartsController.addProductToCart);
cartsRouter.delete("/remove", cartsController.removeProductFromCart);
cartsRouter.delete("/clear", cartsController.clearCart);

export default cartsRouter;
