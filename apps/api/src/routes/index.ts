import { UserService } from "#/services/UserService";
import { Router } from "express";

const appRouter = Router();

appRouter.get("/", async (_, res) => res.status(200).send("hello world"));

appRouter.get("/users/getAll", async (_, res) => {
  const userService = new UserService();
  const result = await userService.getMany();
  res.status(result.success ? 200 : 500).json(result);
});


export { appRouter };
