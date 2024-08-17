import { Request, Response, Handler, NextFunction } from "express";
import { z } from "zod";
import { isZodError } from "./isZodError";

type KeysToCheck = keyof Pick<Request, "body" | "headers" | "query" | "params">;

/** Validates request keys and returns the handler function
 *  with infered types from the schema validation.
 * */
export function zodHandler<
  T extends Partial<{
    [key in KeysToCheck]: z.ZodRawShape;
  }>,
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
  ) => unknown;
}): Handler {
  return async (req, res, next) => {
    try {
      for (const k in schema) {
        const keySchema = schema[k] as z.ZodRawShape;
        req[k as KeysToCheck] = z
          .object(keySchema)
          .parse(req[k as keyof Request]);
      }

      return handler(
        req as Omit<Request, keyof T> & {
          [k in keyof T]: T[k] extends z.ZodRawShape
            ? z.infer<z.ZodObject<T[k]>>
            : never;
        },
        res,
        next,
      );
    } catch (err) {
      const error = isZodError(err)
        ? `${err.issues.map((issue) => `path: ${issue.path.join(".")}, code:${issue.code}`)}`
        : err instanceof Error
          ? err.message
          : err;

      return res.status(400).json({
        success: false,
        message: message,
        error: "Validation Error:" + error,
      });
    }
  };
}
