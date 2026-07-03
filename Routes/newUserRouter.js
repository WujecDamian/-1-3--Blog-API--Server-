import express from "express";

const router = express.Router();

import * as newUserController from "../Controllers/newUserController.js";
// define the home page route
router.post("/", newUserController.createUser);

export default router;
