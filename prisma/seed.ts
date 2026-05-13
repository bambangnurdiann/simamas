import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  for (const name of [RoleName.ADMIN, RoleName.PIMPINAN, RoleName.SEKRETARIS, RoleName.STAFF]) {
    await prisma.role.upsert({ where: { name }, update: {}, create: { name } });
  }
  const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: RoleName.ADMIN } });
  await prisma.user.upsert({
    where: { email: "admin@pa-pasarwajo.go.id" },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@pa-pasarwajo.go.id",
      passwordHash: bcrypt.hashSync("Admin123!", 10),
      roleId: adminRole.id
    }
  });
}

main().finally(() => prisma.$disconnect());
