import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv();

export const env = z
  .object({
    PORT: z.coerce.number(),
    DB_HOST: z.string(),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
  })
  .parse(process.env);
