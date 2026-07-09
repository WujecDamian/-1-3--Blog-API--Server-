import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json({ posts });
};

const getPostById = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.postId),
    },
    include: {
      comments: true,
    },
  });
  res.json({ post });
};

const getPostComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { postId: Number(req.params.postId) },
  });
  res.json({ comments });
};

const createComment = async (req, res) => {
  try {
    const authData = jwt.verify(req.token, process.env.JWT_SECRET);

    const comment = req.body.content;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const newComment = await prisma.comment.create({
      data: {
        authorId: authData.user.id,
        content: comment,
        postId: Number(req.params.postId),
      },
    });

    return res.status(201).json({
      message: "Comment added",
      comment: newComment,
      authData,
    });
  } catch (error) {
    // Tutaj wpadną błędy zarówno z jwt.verify (zły token), jak i z Prismy (błąd bazy)
    console.error("Error in createComment:", error);

    // Jeśli błąd pochodzi z biblioteki JWT (np. JsonWebTokenError lub TokenExpiredError)
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Każdy inny nieprzewidziany błąd serwera
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editComment = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      const comment = req.body.commentContent;
      const editedComment = await prisma.comment.update({
        where: {
          id: Number(req.params.commentId),
        },
        data: {
          content: comment,
        },
      });
      res.json({
        message: "Comment edited...",
        comment: editedComment,
        authData,
      });
    }
  });
};

const deleteComment = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      const deletedComment = await prisma.comment.delete({
        where: { id: Number(req.params.commentId) },
      });
      res.json({
        message: "Comment deleted...",
        comment: deletedComment,
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

const editPost = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      const content = req.body.content;
      const title = req.body.title;
      const editedPost = await prisma.post.update({
        where: { id: Number(req.params.postId) },
        data: {
          content,
          title,
        },
      });
      res.json({
        message: "Post edited...",
        post: editedPost,
        authData,
      });
    }
  });
};

const deletePost = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      const deletedPost = await prisma.post.update({
        where: { id: Number(req.params.postId) },
      });
      res.json({
        message: "Post deleted...",
        post: deletedPost,
        authData,
      });
    }
  });
};

export {
  getAllPosts,
  getPostById,
  getPostComments,
  createComment,
  createPost,
  editPost,
  deletePost,
  editComment,
  deleteComment,
};
