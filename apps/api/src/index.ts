import express from "express";
import { appRouter } from "./routes";
import cors from "cors";
import logger from "./logger";
import { env } from "./lib/dotenv";
import { sequelize } from "./lib/sequelize/config";

const port = env.PORT;

enum ExitStatus {
  success,
  failure,
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled promise rejection: ${promise}. Reason: ${reason}`);
  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught promise exception: ${error}`);
  process.exit(ExitStatus.failure);
});

const app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded());
app.use(
  cors({
    credentials: true,
    origin: true,
    exposedHeaders: "*",
    preflightContinue: false,
    methods: ["GET", "PUT", "POST", "DELETE"],
  }),
);
app.use(appRouter);

app.listen(port, () => {
  try {
    logger.info(`Server running on http://localhost:${port}`);
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

    exitSignals.map((signal) =>
      process.on(signal, async () => {
        try {
          logger.info("Server successfully disconnected");
          process.exit(ExitStatus.success);
        } catch (error) {
          logger.error(`Error while disconnecting server ${error}`);
          process.exit(ExitStatus.failure);
        }
      }),
    );
  } catch (error) {
    logger.error("Server initialization error: " + error);
    process.exit(ExitStatus.failure);
  }
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .then(() => {
    sequelize
      .sync({ alter: true })
      .then(() => console.log("All tables synchronized."))
      .catch((err) => {
        console.error(`Unable to synchronize tables. Error: ${err}`);
      });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
