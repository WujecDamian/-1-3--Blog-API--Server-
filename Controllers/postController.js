import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.postId),
    },
  });
};

const createComment = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      const comment = req.body.commentContent;
      const newComment = await prisma.comment.create({
        data: {
          authorId: authData.user.id, //get user id
          content: comment,
          postId: Number(req.params.postId),
        },
      });
      res.json({
        message: "Comment added...",
        comment: newComment,
        authData,
      });
    }
  });
};

const createPost = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      const content = req.body.content;
      const title = req.body.title;
      const newPost = await prisma.post.create({
        data: {
          authorId: authData.user.id,
          content,
          title,
        },
      });
      res.json({
        message: "Post added...",
        post: newPost,
        authData,
      });
    }
  });
};

export { getAllPosts, getPostById, createComment, createPost };
