import express from "express";

import { validateDiscountCode } from "../controllers/discountsSquare.js";

const discountsRouter = express.Router();

discountsRouter.post("/validate", validateDiscountCode);

export default discountsRouter;