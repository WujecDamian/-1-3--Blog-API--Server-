import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcryptjs";
import "dotenv/config";

const logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password invalid" });
      } else {
        jwt.sign(
          { user },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              res.json({ err });
            }
            res.json({ token, user });
          },
        );
      }
    } else {
      return res.json({ message: "There's no user matching given username" });
    }
  } catch (err) {
    next(err);
  }
};

export { logInUser };
