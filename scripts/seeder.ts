const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.genre.createMany({
      data: [
        {
          name: "FANTASY",
          slug: "fantasy",
        },
        {
          name: "COMEDY",
          slug: "comedy",
        },
        {
          name: "DRAMA",
          slug: "drama",
        },
        {
          name: "ACTION",
          slug: "action",
        },
        {
          name: "SLICE OF LIFE",
          slug: "slice-of-life",
        },
        {
          name: "ROMANCE",
          slug: "romance",
        },
        {
          name: "SUPERHERO",
          slug: "superhero",
        },
        {
          name: "SCI-FI",
          slug: "sci-fi",
        },
        {
          name: "THRILLER",
          slug: "thriller",
        },
        {
          name: "SUPERNATURAL",
          slug: "suppernatural",
        },
        {
          name: "MYSTERY",
          slug: "mystery",
        },
        {
          name: "SPORTS",
          slug: "sports",
        },
        {
          name: "HISTORICAL",
          slug: "historical",
        },
        {
          name: "HEARTWARMING",
          slug: "heartwarming",
        },
        {
          name: "HORROR",
          slug: "horror",
        },
        {
          name: "INFORMATION",
          slug: "information",
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
