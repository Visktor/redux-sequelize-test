import { Request, Handler, NextFunction } from "express";
import { z } from "zod";
import { isZodError } from "./isZodError";

export function zodHandler<
  T extends Partial<{ [key in keyof Request]: z.ZodRawShape }>,
>({
  schema,
  message,
  handler,
}: {
  schema: T;
  message?: string;
  handler: (
    req: Omit<Request, keyof T> & {
      [k in keyof T]: T[k] extends z.ZodRawShape
      ? z.infer<z.ZodObject<T[k]>>
      : never;
    },
    res: Response,
    next: NextFunction,
  ) => any;
}): Handler {
  return async (req, res, next) => {
    try {
      for (let k in schema) {
        const keySchema = schema[k] as z.ZodRawShape;

        // @ts-expect-error
        req[k] = z.object(keySchema).parse(req[k as keyof Request]);
      }

      return handler(
        req as Omit<Request, keyof T> & {
          [k in keyof T]: T[k] extends z.ZodRawShape
          ? z.infer<z.ZodObject<T[k]>>
          : never;
        },
        //@ts-expect-error
        res,
        next,
      );
    } catch (err: any) {
      if (!isZodError(err)) {
        return res.status(400).json({
          success: false,
          message,
          error: err,
        });
      }

      const zodCustomMessage = `${err.issues}`;
    }
  };
}
