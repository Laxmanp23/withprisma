// product.controller.ts

import { Request, Response } from "express";
import { ProductService } from "./product.service";

const service = new ProductService();

export class ProductController {

  async create(req: any, res: Response) {
    const product = await service.createProduct(req.body, req.user);

    res.json({
      success: true,
      data: product
    });
  }

  async getAll(req: any, res: Response) {
    const products = await service.getProducts(req.user);

    res.json({
      success: true,
      data: products
    });
  }

  async getOne(req: any, res: Response) {
    const product = await service.getProduct(Number(req.params.id), req.user);

    res.json({
      success: true,
      data: product
    });
  }

  async update(req: any, res: Response) {
    await service.updateProduct(Number(req.params.id), req.body, req.user);

    res.json({
      success: true,
      message: "Updated successfully"
    });
  }

  async delete(req: any, res: Response) {
    await service.deleteProduct(Number(req.params.id), req.user);

    res.json({
      success: true,
      message: "Deleted successfully"
    });
  }
}