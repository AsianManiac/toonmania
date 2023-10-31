const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.genre.createMany({
      data: [
        {
          name: "FANTASY",
        },
        {
          name: "COMEDY",
        },
        {
          name: "DRAMA",
        },
        {
          name: "ACTION",
        },
        {
          name: "SLICE OF LIFE",
        },
        {
          name: "ROMANCE",
        },
        {
          name: "SUPERHERO",
        },
        {
          name: "SCI-FI",
        },
        {
          name: "THRILLER",
        },
        {
          name: "SUPERNATURAL",
        },
        {
          name: "MYSTERY",
        },
        {
          name: "SPORTS",
        },
        {
          name: "HISTORICAL",
        },
        {
          name: "HEARTWARMING",
        },
        {
          name: "HORROR",
        },
        {
          name: "INFORMATION",
        },
      ],
    });
    console.log("Sucess");
  } catch (error) {
    console.log("Error seeding genres to database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
