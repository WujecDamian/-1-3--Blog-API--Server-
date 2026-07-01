import { prisma } from "../lib/prisma.js";

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export { getAllPosts };
