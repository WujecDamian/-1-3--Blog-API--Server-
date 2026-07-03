import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Provide a password!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  res.json({ message: "Account created!" });
};

export { createUser };
