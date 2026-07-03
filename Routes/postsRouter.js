import express from "express";
import passport from "passport";

const router = express.Router();

import * as postController from "../Controllers/postController.js";
import verifyToken from "../middleware/verifyToken.js";
// define the home page route

//Homepage
router.get("/", postController.getAllPosts);
//Specific post page
router.get("/post/:postId", postController.getPostById);
//Post CRUD - Admin only
router.post("/post/", verifyToken, postController.createPost);
router.put("/post/:postId", verifyToken, postController.updatePost);
router.delete("/post/:postId", verifyToken, postController.deletePost);

router.post("/post/:postId/comment", verifyToken, postController.createComment);

export default router;
