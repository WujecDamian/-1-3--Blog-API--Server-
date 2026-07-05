import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

//Routing
import postsRouter from "./Routes/postsRouter.js";
import newUserRouter from "./Routes/newUserRouter.js";
import logInRouter from "./Routes/logInUserRouter.js";

app.use("api/", postsRouter);
app.use("api/register", newUserRouter);
app.use("api/login", logInRouter);

app.listen(3000, () => {
  console.log("App listens on port http://localhost:3000/");
});
