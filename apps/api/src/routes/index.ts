import { zodHandler } from "#/lib/zod/handler";
import { Router } from "express";
import { z } from "zod";

const appRouter = Router();

appRouter.get("/", async (_, res) => res.status(200).send("hello world"));

appRouter.get(
  "/users/getAll",
  zodHandler({
    schema: {
      query: {
        seila: z.string(),
      },
    },
    handler: async (req, res) => {
      const { seila } = req.query;
    },
  }),
);

export { appRouter };
