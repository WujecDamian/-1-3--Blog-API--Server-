import express from "express";
const app = express();
app.use(express.json());

//Routing
import postsRouter from "./Routes/postsRouter.js";
import newUserRouter from "./Routes/newUserRouter.js";
import logInRouter from "./Routes/logInUserRouter.js";

app.use("/", postsRouter);
app.use("/register", newUserRouter);
app.use("/login", logInRouter);

app.listen(3000, () => {
  console.log("App listens on port http://localhost:3000/");
});
