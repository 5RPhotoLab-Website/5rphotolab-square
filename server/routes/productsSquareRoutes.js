//routes/productsSquareRoutes.js

import express from "express";
import { getSquareProducts, getProductById, getAllProducts } from "../controllers/productsSquare.js";

const productsRouter = express.Router();

productsRouter.get("/", getSquareProducts);
productsRouter.get("/get/:id", getProductById);
productsRouter.get("/all", getAllProducts);

export default productsRouter;
