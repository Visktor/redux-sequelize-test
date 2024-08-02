import express from "express";
import { appRouter } from "./routes";
import cors from "cors";

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

app.listen(3000);
