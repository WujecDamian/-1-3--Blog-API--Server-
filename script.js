import { prisma } from "./lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      password: hashedPassword,
    },
  });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      posts: {
        create: {
          title: "Hello World",
          content: "This is my first post!",
          published: true,
          comments: {
            create: {
              content: "This is comment :)",
              author: {
                connect: { id: user.id },
              },
            },
          },
        },
      },
    },
    include: {
      posts: {
        include: {
          comments: true,
        },
      },
    },
  });
  console.log("Created user:", user, null, 2);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: {
        include: {
          comments: true,
        },
      },
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
