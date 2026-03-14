import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@example.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@example.com",
      password: "123456",
      phone: "9999999999",
      role: Role.SUPER_ADMIN,
    },
  });

  // Shop
  const shop = await prisma.shop.create({
    data: {
      name: "Demo Shop",
      ownerId: superAdmin.id,
    },
  });

  // Admin User
  const admin = await prisma.user.create({
    data: {
      name: "Shop Admin",
      email: "admin@shop.com",
      password: "123456",
      phone: "8888888888",
      role: Role.ADMIN,
      shopId: shop.id,
    },
  });

  // Product Units
  await prisma.productUnit.createMany({
    data: [
      { name: "kg", shopId:shop.id},
      { name: "ml",shopId:shop.id },
      { name: "piece",shopId:shop.id },
      { name: "bag",shopId:shop.id},
    ],
    skipDuplicates: true,
  });

  const unit = await prisma.productUnit.findFirst();

  // Product
  const product = await prisma.product.create({
    data: {
      name: "Rice",
      price: 50,
      stock: 100,
      shopId: shop.id,
      unitId: unit!.id,
    },
  });

  // Customer
  const customer = await prisma.customer.create({
    data: {
      name: "Rahul",
      phone: "7777777777",
      address: "Delhi",
      shopId: shop.id,
    },
  });

  // Vendor
  const vendor = await prisma.vendor.create({
    data: {
      name: "ABC Supplier",
      phone: "6666666666",
      shopId: shop.id,
    },
  });

  // Invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-001",
      customerId: customer.id,
      userId: admin.id,
      shopId: shop.id,
      totalAmount: 100,
    },
  });

  // Invoice Item
  await prisma.invoiceItem.create({
    data: {
      invoiceId: invoice.id,
      productId: product.id,
      quantity: 2,
      price: 50,
    },
  });

  // Payment
  await prisma.payment.create({
    data: {
      invoiceId: invoice.id,
      amount: 100,
      method: "CASH",
    },
  });

  console.log("🌱 Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });