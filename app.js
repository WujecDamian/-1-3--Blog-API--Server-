import express from "express";
const app = express();

import postsRouter from "./Routes/postsRouter.js";

app.use("/", postsRouter);

app.listen(3000, () => {
  console.log("App listens on port http://localhost:3000/");
});
