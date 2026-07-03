import express from "express";

const router = express.Router();

import * as logInUserController from "../Controllers/logInUserController.js";
// define the home page route
router.post("/", logInUserController.logInUser);

export default router;
