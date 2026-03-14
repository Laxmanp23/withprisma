import bcrypt from "bcrypt";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

export class UserService {

  async createStaff(user: any, body: any) {

    const existingStaf = await userRepository.findByEmail(body.email)
    if (existingStaf) {
      throw new Error("Email alrady Exist")
    }
    if (!user) {
      throw new Error("Unauthorized");
    }

    if (user.role !== "ADMIN") {
      throw new Error("Only admin can create staff");
    }

    if (!user.shopId) {
      throw new Error("Shop not found");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    return userRepository.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
      role: "STAFF",
      shopId: user.shopId
    });
  }

  async getUsers(user: any) {

    if (!user || !user.shopId) {
      throw new Error("Unauthorized");
    }

    return userRepository.findAllByShop(user.shopId);
  }

  async getUserById(user: any, id: number) {

    if (!user || !user.shopId) {
      throw new Error("Unauthorized");
    }

    const existing = await userRepository.findById(id);

    if (!existing || existing.shopId !== user.shopId) {
      throw new Error("User not found");
    }

    return existing;
  }

  async updateUser(user: any, id: number, body: any) {

    if (!user || !user.shopId) {
      throw new Error("Unauthorized");
    }

    const existing = await userRepository.findById(id);

    if (!existing || existing.shopId !== user.shopId) {
      throw new Error("User not found");
    }

    return userRepository.update(id, {
      name: body.name,
      phone: body.phone,
      role: body.role
    });
  }

  async deleteUser(user: any, id: number) {

    if (!user || !user.shopId) {
      throw new Error("Unauthorized");
    }

    const existing = await userRepository.findById(id);

    if (!existing || existing.shopId !== user.shopId) {
      throw new Error("User not found");
    }

    return userRepository.softDelete(id);
  }

}