import { zodHandler } from "#/lib/zod/handler";
import { LoginService } from "#/services/LoginService";
import { Router } from "express";
import { z } from "zod";

const appRouter = Router();

appRouter.post(
  "/login",
  zodHandler({
    schema: {
      body: {
        email: z.string().email(),
        password: z.string().min(6),
      },
    },
    handler: async (req, res) => {
      const { email, password } = req.body;

      const service = new LoginService();
      const result = await service.login(email, password);

      return res.status(result.success ? 200 : 500).json(result);
    },
  }),
);

export { appRouter };
