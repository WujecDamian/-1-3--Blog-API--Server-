import express from "express";
import passport from "passport";

const router = express.Router();

import * as postController from "../Controllers/postController.js";
import verifyToken from "../middleware/verifyToken.js";
// define the home page route
router.get("/", postController.getAllPosts);
router.get("/post/:postId", postController.getPostById);
router.post("/post/", verifyToken, postController.createPost);
router.post("/post/:postId/comment", verifyToken, postController.createComment);

export default router;
