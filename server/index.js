import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// link the router file post.js users.js //
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

// Initialize app //
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//dotenv import file //
dotenv.config();

mongoose
  .connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));
  app.use("/posts", postRoutes);
app.use("/user", userRoutes);