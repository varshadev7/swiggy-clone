
// const { PrismaClient } = require("@prisma/client");
// const { restaurants } = require("../lib/data/restaurants.cjs");
// const { menus } = require("../lib/data/menus.cjs");

// const prisma = new PrismaClient();

// async function main() {
//   console.log("Seeding...");

//   for (const r of restaurants) {
//     await prisma.restaurant.upsert({
//       where: { id: r.id },
//       update: {},
//       create: {
//         id: r.id,
//         name: r.name,
//         cuisines: r.cuisines.join(", "),
//         rating: r.rating,
//         deliveryTime: r.deliveryTime,
//         area: r.area,
//         imageUrl: r.imageUrl,
//         isTopRestaurant: r.isTopRestaurant,
//       },
//     });
//   }

//   for (const m of menus) {
//     await prisma.restaurantMenu.create({
//       data: {
//         restaurantId: m.restaurantId,
//         categories: JSON.stringify(m.categories),
//       },
//     });
//   }

//   console.log("Seeding done.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     prisma.$disconnect();
//   });
