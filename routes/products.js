import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/productController.js";

export const productsRouter = express.Router()

productsRouter.post("/", createProduct);
productsRouter.get("/", getAllProducts);
productsRouter.delete("/:id", deleteProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.get("/:id", getProductById);