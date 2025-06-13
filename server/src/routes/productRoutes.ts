import { Router } from "express";
import {
  createProduct,
  getProducts,
  adjustQuantity,
} from "../controllers/productController";

const router: Router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.patch("/:id/quantity", (req, res) => {
  // Wrap the async controller manually so Express doesn't complain
  adjustQuantity(req, res).catch((err) => {
    console.error("Unhandled error in adjustQuantity:", err);
    res.status(500).json({ error: "Something went wrong." });
  });
});

export default router;
