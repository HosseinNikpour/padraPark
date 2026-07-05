import { PrismaClient, MenuItemType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const branch = await prisma.branch.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "شعبه همیلا",
    },
  });

  const items = [
    { title: "Laser Tag", type: MenuItemType.GAME, price: 250000 },
    { title: "Grid", type: MenuItemType.GAME, price: 180000 },
    { title: "VR", type: MenuItemType.GAME, price: 300000 },
    { title: "قهوه", type: MenuItemType.CAFE, price: 80000 },
    { title: "نوشابه", type: MenuItemType.CAFE, price: 50000 },
  ];

  for (const item of items) {
    const menu = await prisma.menuItem.create({
      data: {
        title: item.title,
        type: item.type,
      },
    });

    await prisma.menuItemPrice.create({
      data: {
        menuItemId: menu.id,
        price: item.price,
        startDate: new Date(),
      },
    });
  }

  console.log(branch.name);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });