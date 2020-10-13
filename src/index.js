import express from "express";
import mongoose from "mongoose";
import debug from "debug";
import chalk from "chalk";
import cors from "cors";
import logger from "morgan";
import { Environment } from "./env";

const app = express();
const port = parseInt(process.env.PORT || "3000");
const log = debug("worker");

app.use(express.json());
app.use(express.urlencoded(
  { extended: false },
));
app.use(logger("dev"));
app.use(cors("*"));

app.listen(port, async () => {
  log(chalk.greenBright(`Server running on port ${port}`));

  try {
    // Connect to MongoDB
    const m = await mongoose.connect(Environment.DB[process.env.NODE_ENV], {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    if (m) log(chalk.yellow("Connected to MongoDB"));
  } catch (err) {
    log(chalk.redBright("Error connecting to db"));
    log(err);
  }
});

export default app;
