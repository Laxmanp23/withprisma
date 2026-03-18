// product.service.ts

import { ProductRepository } from "./product.repository";

const repo = new ProductRepository();

export class ProductService {

  async createProduct(data: any, user: any) {
    return repo.create({
      ...data,
      shopId: user.shopId
    });
  }

  async getProducts(user: any) {
    return repo.findAll(user.shopId);
  }

  async getProduct(id: number, user: any) {
    const product = await repo.findById(id, user.shopId);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async updateProduct(id: number, data: any, user: any) {
    const result = await repo.update(id, user.shopId, data);

    if (!result.count) {
      throw new Error("Product not found or not allowed");
    }

    return result;
  }

  async deleteProduct(id: number, user: any) {
    return repo.softDelete(id, user.shopId);
  }
}