import express from "express";

const router = express.Router();

import * as postController from "../Controllers/postController.js";
// define the home page route
router.get("/", postController.getAllPosts);
router.get("/about", (req, res) => {
  res.json("About birds");
});

export default router;
