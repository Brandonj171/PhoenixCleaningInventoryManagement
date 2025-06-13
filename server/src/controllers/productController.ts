import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/products — get all products (with optional search)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

// POST /api/products — create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;

    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// PATCH /api/products/:id/quantity — adjust stock quantity (+/-)
export const adjustQuantity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { delta } = req.body;

  if (typeof delta !== "number") {
    return res.status(400).json({ error: "Invalid delta value. Must be a number." });
  }

  try {
    const updatedProduct = await prisma.products.update({
      where: { productId: id },
      data: {
        stockQuantity: {
          increment: delta,
        },
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Failed to adjust quantity:", error);
    res.status(500).json({ error: "Failed to adjust quantity." });
  }
};
