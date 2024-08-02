import { Router } from "express";

const appRouter = Router();

appRouter.get("/", async (_, res) => res.status(200).send("hello world"));

export { appRouter };
